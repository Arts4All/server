import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { GatewayService } from './gateway.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  constructor(private gatewayService: GatewayService) {};
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('drawToServer')
  drawMessage(_client: Socket, payload: string): void {
    this.gatewayService.drawToServer(this.server, payload);
  }
  @SubscribeMessage('join')
  join(_client: Socket, payload: string): void {
    this.gatewayService.join(this.server, payload);
  }
  
  afterInit(server: Server) {
    console.log(server);
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}, args: ${args}`);
    this.logger.log(`Client connected: ${client.id}`);
  }
}