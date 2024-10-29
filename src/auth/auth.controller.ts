import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { LoginGoogleDto } from './dto/login-google.dto';
import { Response } from 'express';
import { UserTransformer } from 'src/user/transformer/user-transformer';
import { AuthTransformer } from './trasformers/auth-transformer';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  async register(
    @Body() registrationAuthDto: RegistrationDto,
    @Res() res: Response,
  ) {
    const user = await this.authService.register(registrationAuthDto);
    const userTransformer = new UserTransformer();

    res.status(HttpStatus.CREATED).json(userTransformer.handle(user));
  }

  @Post('/login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const auth: AuthDto = await this.authService.login(body);
    const authTransformer = new AuthTransformer();

    res.status(HttpStatus.OK).json(authTransformer.handle(auth));
  }

  @Post('/login/google')
  async loginGoogle(@Body() body: LoginGoogleDto, @Res() res: Response) {
    const auth: AuthDto = await this.authService.loginGoogle(body);

    const authTransformer = new AuthTransformer();

    res.status(HttpStatus.OK).json(authTransformer.handle(auth));
  }
}
