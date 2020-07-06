import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { NodeService } from './Node/__global';

async function bootstrap() {
  NodeService.initCanvas(4, 2);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
