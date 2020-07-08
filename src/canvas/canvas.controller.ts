import { Controller, Get, Res } from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { ConvertImage } from 'src/helpers/convert.image';
import { Request, Response } from 'express';
import * as fs from 'fs';
import { Readable } from 'stream'

@Controller('canvas')
export class CanvasController {
    constructor(private canvasService: CanvasService) { };

    @Get()
    get() {
        return this.canvasService.get();
    }
    @Get('all')
    getAll() {
        return this.canvasService.getAll();
    }
    @Get('update')
    async update() {
        await this.canvasService.update(0, 0, '0, 0, 0');
        await this.canvasService.update(0, 1, '0, 0, 0');
        return 
    }
    @Get('save')
    save() {
        return this.canvasService.save();
    }
    @Get('delete')
    delete() {
        return this.canvasService.delete();
    }
    @Get('image')
    async getImage(@Res() response: Response) {
        const image = await ConvertImage.shared.jsonToImage()
        await image.writeAsync("public/OUTPUT_IMAGE.png");
        const file = fs.createReadStream('public/OUTPUT_IMAGE.png') // or any other way to get a readable stream    
        const ps = new Readable.PassThrough() // <---- this makes a trick with stream error handling
        Readable.pipeline(file, ps, (err) => { if (err) throw err })
        ps.pipe(response)
    }
}
