import { Injectable, Res } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICanvasDocument } from './canvas.interface';
import { NodeService } from 'src/node/node';
import { ConvertImage } from 'src/helpers/convert.image';
import { Readable } from 'stream';
import { Response } from 'express';
import * as fs from 'fs'

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
        return await this.canvasModel.find({}).sort('-date');
    }
    async getLasts(lasts: number): Promise<[ICanvasDocument]> {
        return await this.canvasModel.find({}).limit(lasts).sort('-date');
    }
    async getByOrder(number: number): Promise<ICanvasDocument> {
        const canvas  = await this.canvasModel.find({})
        canvas.reverse()
        return canvas[number]
    }
    update(x: number, y: number, newColor: string): boolean {
        try {
            const value = NodeService.instance.nodes[y][x];
            if (value != NodeService.instance.defaultColor) return false;
            NodeService.instance.nodes[y][x] = newColor;
            return true
        } catch (error) {
            console.log(error)
            return false
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

    async responseImage(
        @Res() response: Response,
        pixels: string[][],
        resize: number) {

        const image = await ConvertImage.shared.jsonToImage(pixels, resize)
        await image.writeAsync("public/OUTPUT_IMAGE.png");
        const file = fs.createReadStream('public/OUTPUT_IMAGE.png') // or any other way to get a readable stream    
        const ps = new Readable.PassThrough() // <---- this makes a trick with stream error handling
        Readable.pipeline(file, ps, (err) => { if (err) throw err })
        ps.pipe(response)
    }

    async delete(): Promise<string> {
        return await this.canvasModel.deleteMany({});
    }

    setup(x: number, y: number): boolean {
        NodeService.instance.sizeX = x
        NodeService.instance.sizeY = y
        NodeService.reset()
        return true
    }
}
