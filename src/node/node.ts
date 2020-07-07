/* eslint-disable prefer-const */
export class NodeService {

    public static instance: NodeService = new NodeService(3, 5);
    public nodes: string[][];
    public sizeX: number
    public sizeY: number
    public paintedSize: number

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor(sizeX: number, sizeY: number) {
        this.sizeX = sizeX
        this.sizeY = sizeY
        this.paintedSize = 0
        let canvas = [];
        for (let index = 0; index < sizeX; index++) {
            canvas[index] = new Array<string>(sizeY);
        }
        for (let indexX = 0; indexX < sizeX; indexX++) {
            for (let indexY = 0; indexY < sizeY; indexY++) {
                canvas[indexX][indexY] = '#ffffff'
            }
        }
        this.nodes = canvas
    };
    public static reset() {
        let sizeX = this.instance.sizeX
        let sizeY = this.instance.sizeY
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

