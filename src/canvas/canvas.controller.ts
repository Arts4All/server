import { Controller, Get, Res, Param } from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { Response } from 'express';
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
    @Get('image/:resize')
    async getImage(@Res() response: Response, @Param('resize') resizeParam: number) {
        const pixels = NodeService.instance.nodes;
        if (!pixels.length && resizeParam <= 200) { return response.json({ sucess: false }) }
        return this.canvasService.responseImage(response, pixels, Number(resizeParam))
    }

    @Get('image/:resize/:id')
    async getImageById(
        @Res() response: Response,
        @Param('id') idParam: number,
        @Param('resize') resizeParam: number) {
        
        const array = await this.canvasService.getByOrder(Number(idParam))
        if (!array.length && resizeParam <= 200) { return response.json({ sucess: false }) }
        const pixels = array[0].nodes;

        return this.canvasService.responseImage(response, pixels, Number(resizeParam))
    }
}
