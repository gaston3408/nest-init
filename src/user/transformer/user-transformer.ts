import { Transformer } from 'src/shared/transform/Transform';
import { User } from '../schemas/user';

export class UserTransformer extends Transformer<User> {
  transform(response: User) {
    return {
      id: response._id,
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email,
    };
  }
}
