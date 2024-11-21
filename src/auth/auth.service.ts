import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';
import { GoogleClient } from 'src/shared/google/google-client';
import { Config } from 'src/config';
import { LoginGoogleDto } from './dto/login-google.dto';
import { AuthDto } from './dto/auth.dto';
import { SERVICES } from 'src/config/constants/services';
import { IEncryptionService } from 'src/shared/interfaces/encryption.interface';
import { UserCreateDto } from 'src/user/dto/user-create.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(SERVICES.IEncryptionService)
    private readonly encryptionService: IEncryptionService,
  ) {}

  async register(payload: RegistrationDto): Promise<User> {
    const existUser = await this.userService.getByEmail(payload.email);

    if (existUser) {
      throw new BadRequestException('Email already exists');
    }

    const user: UserCreateDto = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      password: payload.password
        ? await this.encryptionService.hash(payload.password)
        : null,
    };
    return await this.userService.create(user);
  }

  async login(payload: LoginDto): Promise<AuthDto> {
    const user = await this.userService.getByEmail(payload.email);

    if (!user) {
      throw new NotFoundException();
    }

    if (
      !(await this.encryptionService.compare(payload.password, user.password))
    ) {
      throw new UnauthorizedException();
    }

    return {
      token: await this.generateToken(user),
      user,
    };
  }

  async loginGoogle(payload: LoginGoogleDto): Promise<AuthDto> {
    const googleAuth = await GoogleClient.getAuth(payload.googleToken);

    let user: User = await this.userService.getByEmail(
      googleAuth.email.toLowerCase(),
    );

    if (!user) {
      const newUser: UserCreateDto = {
        firstName: googleAuth.given_name,
        lastName: googleAuth.family_name,
        email: googleAuth.email.toLowerCase(),
      };

      user = await this.userService.create(newUser);
    }

    return {
      token: await this.generateToken(user),
      user,
    };
  }

  private async generateToken(user: User): Promise<string> {
    const secret = Config.get().jwt.secret;
    const exp = Config.get().jwt.expiresIn;
    const algorithm = Config.get().jwt.algorithm;
    const data = {
      id: user._id,
      email: user.email,
      iss: 'nest-auth',
      aud: 'nest-auth',
      sub: user.email,
      jti: user._id,
      iat: Math.floor(Date.now() / 1000),
      exp,
    };
    return jwt.sign(data, secret, { algorithm });
  }
}
