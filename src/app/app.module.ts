import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GatewayModule } from 'src/gateway/gateway.module';
import { CanvasModule } from 'src/canvas/canvas.module';

const options = {
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  useNewUrlParser: true
};
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://admin:admin123321@ds023213.mlab.com:23213/arts4all_server', options),
    GatewayModule,
    CanvasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
