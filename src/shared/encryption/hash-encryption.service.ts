import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashEncryptionService {
  public async hash(text: string, saltRounds: number = 10): Promise<string> {
    return bcrypt.hash(text, saltRounds);
  }

  public async compare(text: string, hashedText: string): Promise<boolean> {
    return bcrypt.compare(text, hashedText);
  }
}
