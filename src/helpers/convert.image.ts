import * as Jimp from 'jimp';
import { NodeService } from "src/node/node";

export class ConvertImage {

    public static shared: ConvertImage = new ConvertImage();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { };

    private componentToHex(c: number): string {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    private rgbToHex(r: number, g: number, b: number): string {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }

    private hexToRgb(hex: string): { r: number; g: number; b: number; } {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
            ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16),
            }
            : null;
    }
    private transformArrayInRgb(arr: string[][]): string[][] {
        return arr.map(elem=>elem.map(e=>`${this.hexToRgb(e).r}, ${this.hexToRgb(e).g}, ${this.hexToRgb(e).b}`))
    }
    async jsonToImage(): Promise<Jimp> {
        const pixels = NodeService.instance.nodes;
        console.log(pixels[0][0])
        try {
            const image = await new Jimp(pixels[0].length, pixels.length);

            pixels.forEach((rowPixels, y) => {
                rowPixels.forEach((pixel, x) => {
                    const rgb = pixel.split(",");
                    const r = Number(rgb[0]);
                    const g = Number(rgb[1]);
                    const b = Number(rgb[2]);
                    const color = Jimp.rgbaToInt(r, g, b, 255);
                    image.setPixelColor(color, x, y);
                });
            });

            // await image.scale(200)
            return image
        } catch (error) {
            throw error
        }
    }
}