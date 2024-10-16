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

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly encryptionService: HashEncryptionService,
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

    return {
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };
  }

  async loginGoogle(googleToken: string): Promise<any> {
    const googleClient = GoogleClient.getInstance();

    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: googleToken,
        audience: Config.get().auth.googleId,
      });
      const authUser = ticket.getPayload();
      console.log('ticket payload: ', authUser);
    } catch (error) {
      console.error('Google OAuth verification failed: ', error);
      throw new UnauthorizedException();
    }

    const mockUser: Partial<User> = {
      _id: 'google-user-id',
      firstName: 'Mock',
      lastName: 'User',
      email: 'mock-user@example.com',
    };

    return {
      token: await this.generateToken(mockUser as User),
      user: mockUser,
    };
  }

  private async generateToken(user: User): Promise<string> {
    // Generate JWT token here
    const secret = Config.get().jwt.secret;
    const exp = Config.get().jwt.expiresIn;
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
