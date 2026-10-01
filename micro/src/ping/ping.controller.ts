import { Controller, Get } from '@nestjs/common';
import { Respuesta } from '../common/respuesta';
import { PingService } from './ping.service';

@Controller('ping')
export class PingController {
  constructor(private readonly pingService: PingService) {}

  // El controller solo delega; la logica vive en el service.
  @Get()
  ping(): Respuesta {
    return this.pingService.ping();
  }
}
