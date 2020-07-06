/* eslint-disable prefer-const */
export class NodeService {

    public static instance: NodeService = new NodeService();
    public nodes: string[][];
    public sizeX: number
    public sizeY: number
    public paintedSize: number

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {};

    public static initCanvas(sizeX: number, sizeY: number) {
        this.instance.sizeX = sizeX
        this.instance.sizeY = sizeY
        this.instance.paintedSize = 0
        let canvas = [];
        for (let index = 0; index < sizeX; index++) {
            canvas[index] = new Array<string>(sizeY);
        }
        for (let indexX = 0; indexX < sizeX; indexX++) {
            for (let indexY = 0; indexY < sizeY; indexY++) {
                canvas[indexX][indexY] = '#ffffff'
            }
        }
        this.instance.nodes = canvas
    }
}

