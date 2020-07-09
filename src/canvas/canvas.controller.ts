import { Controller, Get, Res, Param } from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { ConvertImage } from 'src/helpers/convert.image';
import { Response } from 'express';
import * as fs from 'fs';
import { Readable } from 'stream'
import { NodeService } from 'src/node/node';

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
        const pixels = NodeService.instance.nodes;
        const image = await ConvertImage.shared.jsonToImage(pixels, 100)
        await image.writeAsync("public/OUTPUT_IMAGE.png");
        const file = fs.createReadStream('public/OUTPUT_IMAGE.png') // or any other way to get a readable stream    
        const ps = new Readable.PassThrough() // <---- this makes a trick with stream error handling
        Readable.pipeline(file, ps, (err) => { if (err) throw err })
        ps.pipe(response)
    }
    @Get('image/:id')
    async getImageById(@Res() response: Response, @Param('id') idParam: number) {
        const array = await this.canvasService.getByOrder(Number(idParam))
        if (!array.length) { return response.json({sucess: false})} 
        const pixels = array[0].nodes;
        const image = await ConvertImage.shared.jsonToImage(pixels, 100)
        await image.writeAsync("public/OUTPUT_IMAGE.png");
        const file = fs.createReadStream('public/OUTPUT_IMAGE.png') // or any other way to get a readable stream    
        const ps = new Readable.PassThrough() // <---- this makes a trick with stream error handling
        Readable.pipeline(file, ps, (err) => { if (err) throw err })
        ps.pipe(response)
    }
}
