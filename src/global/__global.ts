/* eslint-disable prefer-const */
declare let nodes: [[string]];
const canvas = [];
declare let sizeX: number
declare let sizeY: number
declare let paintedSize: number

sizeX = 2
sizeY = 2
paintedSize = 0

for(let index = 0; index<sizeX; index++) {
    canvas[index] = new Array(sizeY);
}
for (let indexX = 0; indexX < sizeX; indexX++) {
    for (let indexY = 0; indexY < sizeY; indexY++) {
        canvas[indexX][indexY] = '#ffffff'
    }
}

eval(`nodes = ${JSON.stringify(canvas)};`)