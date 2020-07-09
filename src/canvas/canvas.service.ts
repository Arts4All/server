import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICanvasDocument } from './canvas.interface';
import { NodeService } from 'src/node/node';

@Injectable()
export class CanvasService {
    constructor(
        @InjectModel('canvas')
        private readonly canvasModel: Model<ICanvasDocument>,
    ) { };
    get(): any {
        return {
            nodes: NodeService.instance.nodes,
            sizeX: NodeService.instance.sizeX,
            sizeY: NodeService.instance.sizeY,
        }
    }
    async getAll(): Promise<[ICanvasDocument]> {
        return await this.canvasModel.find({}).limit(20);
    }
    update(x: number, y: number, newColor: string) {
        try {
            const value = NodeService.instance.nodes[y][x] || '255, 255, 255';
            if (value != '255, 255, 255') return;
            NodeService.instance.nodes[y][x] = newColor;
            NodeService.instance.paintedSize += 1;
            if (NodeService.instance.paintedSize == NodeService.instance.sizeX * NodeService.instance.sizeY) {
                this.save()
            }
        } catch (error) {
            console.log(error)
        }

    }
    save() {
        const canvas: ICanvasDocument = {
            sizeX: NodeService.instance.sizeX,
            sizeY: NodeService.instance.sizeY,
            paintedSize: NodeService.instance.paintedSize,
            nodes: NodeService.instance.nodes,
            finished: true,
        };
        this.canvasModel.create(canvas);
        NodeService.reset()
    }
    async delete(): Promise<string> {
        return await this.canvasModel.deleteMany({});
    }
}
