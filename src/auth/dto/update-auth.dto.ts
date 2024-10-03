import { PartialType } from '@nestjs/mapped-types';
import { RegistrationAuthDto } from './registration-auth.dto';

export class UpdateAuthDto extends PartialType(RegistrationAuthDto) {}
