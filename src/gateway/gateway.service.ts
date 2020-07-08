import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { NodeService } from 'src/node/node';
import { CanvasService } from 'src/canvas/canvas.service';

@Injectable()
export class GatewayService {
    constructor(
        private readonly canvasService: CanvasService,
    ) {};

    async join(server: Server, payload: string, client: Socket) {
        server.emit('joined', payload, JSON.stringify(NodeService.instance.nodes));
    }

    async drawToServer(server: Server, payload: string) {
        try {
            await this.canvasService.update(Number(payload[0]), Number(payload[1]), payload[2])
            server.emit('drawToClient', Number(payload[0]), Number(payload[1]), payload[2]);
        } catch (error) {
            console.log(error);
        }
    }

    async end(server: Server, payload: string) {
        server.emit('end', payload);
        console.log('end');
    }
}
