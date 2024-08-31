import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { JuiceStationController } from './juiceStation.controller';
import { JuiceStationRepository } from './juiceStation.repository';
import { JuiceStationService } from './juiceStation.service';
import { FindJuiceStationByIdUsecase } from './usecases/findJuiceStationById.usecase';
import { ListJuiceStationsUsecase } from './usecases/listJuiceStation.usexase';

@Module({
  imports: [],
  controllers: [JuiceStationController],
  providers: [
    PrismaService,
    JuiceStationRepository,
    JuiceStationService,
    FindJuiceStationByIdUsecase,
    ListJuiceStationsUsecase,
  ],
  exports: [JuiceStationService],
})
export class JuiceStationModule {}
