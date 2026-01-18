// interfaces/http/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from '../../application/use-case/login.service';
import { CreateUserService } from '../../application/use-case/user.create.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginService: LoginService,
        private readonly createUserService: CreateUserService,
    ) { }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.loginService.execute(body.email, body.password);
    }

    @Post('register')
    register(@Body() body: { email: string; password: string }) {
        return this.createUserService.execute(body.email, body.password);
    }
}
