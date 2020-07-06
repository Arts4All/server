import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CanvasService } from './canvas.service';
import { CanvasController } from './canvas.controller';
import { CanvasSchema } from './canvas.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'canvas', schema: CanvasSchema }]),
    ],
    providers: [CanvasService],
    exports: [CanvasService],
    controllers: [CanvasController],
})

export class CanvasModule {}
