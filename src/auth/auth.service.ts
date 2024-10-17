import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegistrationDto } from './dto/registration.dto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/schemas/user';
import { LoginDto } from './dto/login.dto';
import { HashEncryptionService } from 'src/shared/encryption/hash-encryption.service';
import * as jwt from 'jsonwebtoken';
import { GoogleClient } from 'src/shared/google/google-client';
import { Config } from 'src/config';
import { TokenPayload } from 'google-auth-library';
import { LoginGoogleDto } from './dto/login-google.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptionService: HashEncryptionService,
  ) {}

  async register(payload: RegistrationDto): Promise<any> {
    const user = await this.userService.create(payload);

    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
  }

  async login(payload: LoginDto): Promise<any> {
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
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };
  }

  async loginGoogle(payload: LoginGoogleDto): Promise<any> {
    const googleClient = GoogleClient.getInstance();

    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: payload.googleToken,
        audience: Config.get().auth.googleId,
      });

      const googleAuth: TokenPayload = ticket.getPayload();

      let user: User = await this.userService.getByEmail(
        googleAuth.email.toLowerCase(),
      );

      if (!user) {
        const newUser: RegistrationDto = {
          firstName: googleAuth.given_name,
          lastName: googleAuth.family_name,
          email: googleAuth.email.toLowerCase(),
        };

        user = await this.userService.create(newUser);
      }

      return {
        token: await this.generateToken(user),
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      };
    } catch (error) {
      console.error('Google OAuth verification failed: ', error);
      throw new UnauthorizedException();
    }
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
