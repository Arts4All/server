import { Document } from "mongoose";

export interface ICanvasDocument extends Document {
    nodes: string[][],
    sizeX: number,
    sizeY: number,
    finished: boolean,
    paintedSize: number
}
