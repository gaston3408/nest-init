import { Transformer } from 'src/shared/transform/Transform';
import { UserTransformer } from 'src/user/transformer/user-transformer';
import { AuthDto } from '../dto/auth.dto';

export class AuthTransformer extends Transformer<AuthDto> {
  private readonly userTransformer: UserTransformer;
  constructor() {
    super();
    this.userTransformer = new UserTransformer();
  }

  transform(response: AuthDto) {
    return {
      token: response.token,
      user: this.userTransformer.transform(response.user),
    };
  }
}
