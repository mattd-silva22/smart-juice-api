import { Module } from '@nestjs/common';
import { AppController } from 'src/core/app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from 'src/core/app.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente acessíveis globalmente
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
