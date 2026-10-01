import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { PingController } from './ping.controller';
import { PingService } from './ping.service';

@Module({
  imports: [CoreModule],
  controllers: [PingController],
  providers: [PingService],
})
export class PingModule {}
