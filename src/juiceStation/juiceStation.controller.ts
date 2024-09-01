import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JuiceStationService } from './juiceStation.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('stations')
export class JuiceStationController {
  constructor(private readonly juiceStationService: JuiceStationService) {}

  @Get()
  async listJuiceStations(@Req() req: Request, @Res() res: Response) {
    const data = await this.juiceStationService.listJuiceStations();
    res.status(HttpStatus.OK).json(data);
  }

  @Get(':id')
  async findJuiceStationById(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const data = await this.juiceStationService.findJuiceStationById(id);
    res.status(HttpStatus.OK).json(data);
  }
}
