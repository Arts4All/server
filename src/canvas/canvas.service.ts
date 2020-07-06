import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICanvasDocument } from './canvas.interface';

@Injectable()
export class CanvasService {
    constructor(
        @InjectModel('canvas')
        private readonly canvasModel: Model<ICanvasDocument>,
    ) { };
    get(): any {
        return {
            nodes,
            sizeX,
            sizeY
        }
    }
    async getAll(): Promise<[ICanvasDocument]> {
        return await this.canvasModel.find({}).limit(20);
    }
    update(x: number, y: number, newColor: string) {
        const value = nodes[x][y] || '#ffffff';
        if (value != '#ffffff') return;
        nodes[x][y] = newColor;
    }
    save() {
        const canvas: ICanvasDocument = {
            sizeX: sizeX,
            sizeY: sizeY,
            paintedSize: paintedSize,
            nodes: nodes,
            finished: true,
        };
        this.canvasModel.create(canvas);
    }
    async delete(): Promise<string> {
        return await this.canvasModel.deleteMany({});
    }
}
