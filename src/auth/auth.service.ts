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
import MainConfigService from 'src/config/main-config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptionService: HashEncryptionService,
    private readonly mainConfigService: MainConfigService,
  ) {}

  async register(payload: RegistrationDto): Promise<User> {
    return await this.userService.create(payload);
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

    const token = await this.generateToken(user);

    return { token };
  }

  private async generateToken(user: User): Promise<string> {
    // Generate JWT token here
    const secret = this.mainConfigService.get().jwt.secret;
    const exp = this.mainConfigService.get().jwt.expiresIn;
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
    return jwt.sign(data, secret, { algorithm: 'HS256' });
  }
}
