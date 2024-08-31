import { Controller, Get, Param } from '@nestjs/common';
import { JuiceStationService } from './juiceStation.service';

@Controller('stations')
export class JuiceStationController {
  constructor(private readonly juiceStationService: JuiceStationService) {}

  @Get()
  async listJuiceStations() {
    return await this.juiceStationService.listJuiceStations();
  }

  @Get(':id')
  async findJuiceStationById(@Param('id') id: string) {
    return await this.juiceStationService.findJuiceStationById(id);
  }
}
