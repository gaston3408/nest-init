import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';
import { LoginGoogleDto } from './dto/login-google.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  register(@Body() registrationAuthDto: RegistrationDto) {
    return this.authService.register(registrationAuthDto);
  }

  @Post('/login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('/login/google')
  loginGoogle(@Body() body: LoginGoogleDto) {
    return this.authService.loginGoogle(body);
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
