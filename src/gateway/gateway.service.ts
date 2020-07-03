import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';


@Injectable()
export class GatewayService {
    async drawToServer(server: Server, payload: string) {
        server.emit('drawToClient', payload);
        console.log('hello');
    }
}
