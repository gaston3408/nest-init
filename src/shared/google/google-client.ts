import { UnauthorizedException } from '@nestjs/common';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { Config } from 'src/config';

export class GoogleClient {
  static instance: OAuth2Client;

  public static getInstance(): OAuth2Client {
    if (!GoogleClient.instance) {
      GoogleClient.instance = new OAuth2Client(
        Config.get().auth.googleId,
        Config.get().auth.googleSecret,
      );
    }

    return GoogleClient.instance;
  }

  public static async getAuth(token: string): Promise<TokenPayload> {
    try {
      const instance = GoogleClient.getInstance();

      const ticket = await instance.verifyIdToken({
        idToken: token,
        audience: Config.get().auth.googleId,
      });

      return ticket.getPayload();
    } catch (error) {
      console.error('Google OAuth verification failed: ', error);
      throw new UnauthorizedException();
    }
  }
}
