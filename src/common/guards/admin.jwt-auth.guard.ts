import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AdminJwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    //start
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: "Authorization berilmagan" });
    }

    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];

    if (bearer != "Bearer" || !token) {
      throw new UnauthorizedException({ message: "Bearer token berilmagan" });
    }

    let decodedPayload: any;
    try {
      decodedPayload = this.jwtService.verify(token, {
        secret: process.env.ADMIN_SECRET_KEY,
      });
    } catch (error) {
      throw new UnauthorizedException({
        message: "Foydalanuvchi authorizatsiyadan o'tmagan",
        error: error,
      });
    }
    req.admin = decodedPayload;
    // logic
    return true;
  }
}
