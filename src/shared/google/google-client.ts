import { OAuth2Client } from 'google-auth-library';
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
}
