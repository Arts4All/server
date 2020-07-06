import { Controller, Get } from '@nestjs/common';
import { CanvasService } from './canvas.service';

@Controller('canvas')
export class CanvasController {
    constructor(private canvasService: CanvasService) {};

    @Get()
    get() {
        return this.canvasService.get();
    }
    @Get('all')
    getAll() {
        return this.canvasService.getAll();
    }
    @Get('update')
    update() {
        return this.canvasService.update(0, 0, '#fefefe');
    }
    @Get('save')
    save() {
        return this.canvasService.save();
    }
    @Get('delete')
    delete() {
        return this.canvasService.delete();
    }
}
