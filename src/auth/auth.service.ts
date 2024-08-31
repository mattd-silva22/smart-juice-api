import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    // Valide o usuário no banco de dados (exemplo simplificado)
    const user = await this.userService.findUserByUsername(username, true);

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async getUserFromToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);

      const user = await this.userService.findUserById(decoded.sub);

      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado.');
      }

      return user;
    } catch (UserError) {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
