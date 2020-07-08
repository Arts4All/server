import { Module } from '@nestjs/common';
import { AppGateway } from '../gateway/app.gateway';
import { GatewayService } from './gateway.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CanvasSchema } from 'src/canvas/canvas.schema';
import { CanvasService } from 'src/canvas/canvas.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'canvas', schema: CanvasSchema }]),
  ],
  providers: [
    GatewayService, 
    CanvasService,
    AppGateway
  ],
  exports: [
    GatewayService, 
    CanvasService,
    AppGateway
  ],
})
export class GatewayModule {}