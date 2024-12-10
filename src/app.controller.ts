import { Controller, Get, Request, Post, UseGuards, HttpStatus } from '@nestjs/common';
import { AuthService } from "./auth/auth.service";
import { BasicAuthGuard } from "./auth/guards/bacis-auth.guard";


@Controller()
export class AppController {

  constructor(private authService: AuthService) {
    console.log('AppController authService:', authService);
  }

  @Get([ '', 'ping' ])
  healthCheck(): any {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  @UseGuards(BasicAuthGuard)
  @Post('api/auth/login')
  async login(@Request() req) {
    const token = this.authService.login(req.user, 'basic');

    return  {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        ...token,
      },
    };
  }

  @UseGuards(BasicAuthGuard)
  @Get('api/profile')
  async getProfile(@Request() req) {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        user: req.user,
      },
    };
  }
}
