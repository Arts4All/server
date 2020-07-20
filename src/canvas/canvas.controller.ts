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
    @ApiOperation({ summary: 'Get quantity canvas' })
    @Get('quantity')
    async getCount() {
        const canvas = await this.canvasService.getLasts(20);
        return {number: canvas.length};
    }

    @ApiTags('canvas')
    @ApiOperation({ summary: 'Get all canvas' })
    @Get('all')
    getAll() {
        return this.canvasService.getAll();
    }
    @ApiTags('canvas')
    @ApiOperation({ summary: 'Get lats canvas by quantity' })
    @Get('lasts/:quantity')
    getLasts(@Param('quantity') quantityParam: number) {
        return this.canvasService.getLasts(Number(quantityParam));
    }
    @ApiTags('canvas')
    @ApiOperation({ summary: 'Save current canvas and generate a new' })
    @Post('save')
    save() {
        return this.canvasService.save();
    }
    @ApiTags('canvas')
    @ApiOperation({ summary: 'Configure a new canvas size, default: 10x5' })
    @Put('setup/:x/:y')
    async setup(
        @Param('x') xParam: number,
        @Param('y') yParam: number) {
        console.log(xParam, yParam)
        return this.canvasService.setup(Number(xParam), Number(yParam))
    }
    @ApiTags('canvas')
    @ApiOperation({ summary: '[Danger] Delete all canvas' })
    @Delete('delete')
    delete() {
        return this.canvasService.delete();
    }
    @ApiTags('image')
    @ApiOperation({ summary: 'Get image from current canvas by scale, max scale is 200' })
    @Get('image/:scale')
    async getImage(@Res() response: Response, @Param('scale') scaleParam: number) {
        const pixels = NodeService.instance.nodes;
        if (!pixels.length && scaleParam <= 200) { return response.json({ sucess: false }) }
        return this.canvasService.responseImage(response, pixels, Number(scaleParam))
    }
    @ApiTags('image')
    @ApiOperation({ summary: 'Get image canvas by orgem desc of creation and scale, max scale is 200' })
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
