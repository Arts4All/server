/* eslint-disable prefer-const */
export class NodeService {

    public static instance: NodeService = new NodeService(15, 10);
    public nodes: string[][];
    public sizeX: number
    public sizeY: number
    public paintedSize: number
    public defaultColor: string

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor(sizeX: number, sizeY: number) {
        this.sizeX = sizeX
        this.sizeY = sizeY
        this.paintedSize = 0
        this.defaultColor = '229,229,229'
        let canvas = [];
        for (let index = 0; index < sizeY; index++) {
            canvas[index] = new Array<string>(sizeX);
        }
        for (let indexX = 0; indexX < sizeY; indexX++) {
            for (let indexY = 0; indexY < sizeX; indexY++) {
                canvas[indexX][indexY] = this.defaultColor
            }
        }
        this.nodes = canvas
    };
    public static reset() {
        let sizeX = this.instance.sizeX
        let sizeY = this.instance.sizeY
        this.instance.paintedSize = 0
        let canvas = [];
        for (let index = 0; index < sizeY; index++) {
            canvas[index] = new Array<string>(sizeX);
        }
        for (let indexX = 0; indexX < sizeY; indexX++) {
            for (let indexY = 0; indexY < sizeX; indexY++) {
                canvas[indexX][indexY] = this.instance.defaultColor
            }
        }
        this.instance.nodes = canvas
    }
    public static isFinished(): boolean {
        NodeService.instance.paintedSize += 1;
        return NodeService.instance.paintedSize == NodeService.instance.sizeX * NodeService.instance.sizeY
    }
}

