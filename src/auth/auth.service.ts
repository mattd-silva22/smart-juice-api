import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    // Valide o usuário no banco de dados (exemplo simplificado)
    const user = await this.findUserByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Função para buscar usuário (mockado como exemplo)
  async findUserByUsername(username: string) {
    const users = [
      { id: 1, username: 'user', password: bcrypt.hashSync('password', 10) },
    ];
    return users.find((user) => user.username === username);
  }
}
