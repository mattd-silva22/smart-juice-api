import { Injectable, Param } from '@nestjs/common';
import { JuiceStationRepository } from './juiceStation.repository';

@Injectable()
export class JuiceStationService {
  constructor(
    private readonly juiceStationRepository: JuiceStationRepository,
  ) {}

  async findJuiceStationById(@Param('id') id: string) {
    return await this.juiceStationRepository.findJuiceStationById(id);
  }

  async listJuiceStations() {
    return await this.juiceStationRepository.listJuiceStations();
  }
}
