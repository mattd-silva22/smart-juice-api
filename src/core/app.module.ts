import { Module } from '@nestjs/common';
import { AppController } from 'src/core/app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from 'src/core/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UserModule } from 'src/users/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente acessíveis globalmente
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
