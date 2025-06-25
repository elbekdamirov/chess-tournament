import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { AdminsService } from "../admins/admins.service";
import { CreateAdminDto } from "../admins/dto/create-admin.dto";
import { Admin } from "../admins/model/admin.model";
import { SigninAdminDto } from "../admins/dto/signin-admin.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminsService,
    private readonly jwtService: JwtService
  ) {}

  private async generateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      email: admin.email,
      is_creator: admin.is_creator,
    };

    return { token: this.jwtService.sign(payload) };
  }

  async signup(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.getAdminByEmail(
      createAdminDto.email
    );

    if (candidate) {
      throw new ConflictException("Bunday foydalanuvchi mavjud");
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 7);
    createAdminDto.password = hashedPassword;
    const admin = await this.adminService.create(createAdminDto);

    return admin;
  }

  async signin(signinAdminDto: SigninAdminDto) {
    const admin = await this.adminService.getAdminByEmail(signinAdminDto.email);

    if (!admin) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const validPassword = await bcrypt.compare(
      signinAdminDto.password,
      admin.password
    );

    if (!validPassword) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }

    const token = await this.generateToken(admin);

    return { message: "Admin signed in", id: admin.id, token };
  }
}
