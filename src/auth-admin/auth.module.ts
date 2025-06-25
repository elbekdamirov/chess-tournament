import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { AdminsModule } from "../admins/admins.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: process.env.ADMIN_SECRET_KEY,
      signOptions: { expiresIn: process.env.ADMIN_SECRET_TIME },
    }),
    AdminsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthAdminModule {}
