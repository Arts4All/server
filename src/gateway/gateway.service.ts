import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';
import { NodeService } from 'src/node/node';
import { CanvasService } from 'src/canvas/canvas.service';

@Injectable()
export class GatewayService {
    constructor(
        private readonly canvasService: CanvasService,
    ) { };

    async join(server: Server, payload: string) {
        server.emit('joined', payload, JSON.stringify(NodeService.instance.nodes));
    }

    async drawToServer(server: Server, payload: string) {
        try {
            const answer = await this.canvasService.update(
                Number(payload[0]),
                Number(payload[1]),
                payload[2]
            );

            if (!answer) return;

            server.emit('drawToClient',
                Number(payload[0]),
                Number(payload[1]),
                payload[2],
            );

            if (NodeService.isFinished()) {
                await this.canvasService.save()
                this.end(server, payload);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async end(server: Server, payload: string) {
        server.emit('end', payload);
        console.log('end');
    }
}
