import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';

@Injectable()
export class JuiceStationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findJuiceStationById(juiceStationId: string) {
    return await this.prismaService.juiceStation.findUnique({
      where: { id: juiceStationId },
      include: {
        address: true,
      },
    });
  }

  async listJuiceStations() {
    return await this.prismaService.juiceStation.findMany({
      include: {
        address: true,
      },
    });
  }
}
