import * as mongoose from 'mongoose';

export const CanvasSchema = new mongoose.Schema({
    nodes: [[String]],
    sizeX: Number,
    sizeY: Number,
    finished: Number,
    paintedSize: Number
}, {
    timestamps: true
});