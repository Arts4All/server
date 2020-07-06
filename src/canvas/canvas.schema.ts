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

// Static methods
CanvasSchema.methods.getDTO = async function () {
    // const canvasDTO = new CanvasDTO();
    // canvasDTO.id = this.id;
    // canvasDTO.fullname = this.fullname;
    // canvasDTO.nickname = this.nickname;
    // canvasDTO.picture = this.picture;
    // return canvasDTO;
}