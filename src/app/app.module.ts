import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from '../components/gateway/app.gateway';

@Module({
  imports: [AppGateway],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
