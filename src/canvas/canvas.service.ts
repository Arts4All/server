import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICanvasDocument } from './canvas.interface';
import { NodeService } from 'src/Node/__global';

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
        const value = NodeService.instance.nodes[x][y] || '#ffffff';
        if (value != '#ffffff') return;
        NodeService.instance.nodes[x][y] = newColor;
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
    }
    async delete(): Promise<string> {
        return await this.canvasModel.deleteMany({});
    }
}
