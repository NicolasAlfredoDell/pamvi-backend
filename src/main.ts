import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: [`${process.env.CORS_ORIGIN}`],
    methods: ['DELETE', 'GET', 'PATCH', 'POST', 'PUT'],
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen(process.env.API_PORT);
  logger.log(`Aplicación corriendo en el puerto ${process.env.API_PORT}`);
}
main();
