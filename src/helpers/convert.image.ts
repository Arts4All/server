import * as Jimp from 'jimp';

export class ConvertImage {
    public static shared: ConvertImage = new ConvertImage();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() { };

    async jsonToImage(pixels: string[][], resize: number): Promise<Jimp> {
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

            await image.scale(resize, Jimp.RESIZE_NEAREST_NEIGHBOR)
            return image
        } catch (error) {
            throw error
        }
    }
}