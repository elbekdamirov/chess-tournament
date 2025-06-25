import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAdminDto } from "../admins/dto/create-admin.dto";
import { SigninAdminDto } from "../admins/dto/signin-admin.dto";

@Controller("auth-admin")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signup")
  signup(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signup(createAdminDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  signin(@Body() signinUserDto: SigninAdminDto) {
    return this.authService.signin(signinUserDto);
  }
}
