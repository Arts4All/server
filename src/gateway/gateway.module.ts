import { Module } from '@nestjs/common';
import { AppGateway } from '../gateway/app.gateway';
import { GatewayService } from './gateway.service';

@Module({
  imports: [AppGateway],
  providers: [GatewayService],
})
export class GatewayModule {}