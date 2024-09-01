import { Module } from '@nestjs/common';
import { AppController } from 'src/core/app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from 'src/core/app.service';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UserModule } from 'src/users/user.module';
import { ProductModule } from 'src/products/product.module';
import { JuiceStationModule } from 'src/juiceStation/juiceStation.module';
import { OrdersController } from 'src/orders/orders.controller';
import { OrdersModule } from 'src/orders/orders.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna as variáveis de ambiente acessíveis globalmente
    }),
    AuthModule,
    UserModule,
    ProductModule,
    JuiceStationModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
