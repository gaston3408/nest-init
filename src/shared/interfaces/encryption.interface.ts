export interface IEncryptionService {
  hash(text: string, saltRounds?: number): Promise<string>;
  compare(text: string, hashedText: string): Promise<boolean>;
}
