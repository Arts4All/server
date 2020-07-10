import { Controller, Get, Res, Param, Delete, Put, Post } from '@nestjs/common';
import { CanvasService } from './canvas.service';
import { Response } from 'express';
import { NodeService } from 'src/node/node';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('canvas')
export class CanvasController {
    constructor(private canvasService: CanvasService) { };
    @ApiTags('canvas')
    @ApiOperation({ summary: 'Get current canvas' })
    @Get()
    get() {
        return this.canvasService.get();
    }
    @ApiTags('canvas')
    @Get('all')
    getAll() {
        return this.canvasService.getAll();
    }
    @ApiTags('canvas')
    @Get('lasts/:quantity')
    getLasts(@Param('quantity') quantityParam: number) {
        return this.canvasService.getLasts(Number(quantityParam));
    }
    @ApiTags('canvas')
    @Post('save')
    save() {
        return this.canvasService.save();
    }
    @ApiTags('canvas')
    @Put('setup/:x/:y')
    async setup(
        @Param('x') xParam: number,
        @Param('y') yParam: number) {
        console.log(xParam, yParam)
        return this.canvasService.setup(Number(xParam), Number(yParam))
    }
    @ApiTags('canvas')
    @Delete('delete')
    delete() {
        return this.canvasService.delete();
    }
    @ApiTags('image')
    @Get('image/:scale')
    async getImage(@Res() response: Response, @Param('scale') scaleParam: number) {
        const pixels = NodeService.instance.nodes;
        if (!pixels.length && scaleParam <= 200) { return response.json({ sucess: false }) }
        return this.canvasService.responseImage(response, pixels, Number(scaleParam))
    }
    @ApiTags('image')
    @Get('image/:scale/:id')
    async getImageById(
        @Res() response: Response,
        @Param('id') idParam: number,
        @Param('scale') scaleParam: number) {

        const array = await this.canvasService.getByOrder(Number(idParam))
        if (!array.length && scaleParam <= 200) { return response.json({ sucess: false }) }
        const pixels = array[0].nodes;

        return this.canvasService.responseImage(response, pixels, Number(scaleParam))
    }
}
