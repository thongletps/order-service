import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('server.port');
  const context = configService.get('server.context');
  app.setGlobalPrefix(context);
  await app.listen(port);
  console.log(`Application started http://localhost:${port}/${context}`);
}

bootstrap();
