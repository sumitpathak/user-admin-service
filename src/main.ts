import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.setGlobalPrefix('api/v1/user-admin-service');
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
    }),
  );
  //if (getEnvConfig().env !== 'prod') {
  const config = new DocumentBuilder()
    .setTitle('User Admin Service')
    .setDescription('The User Admin Service API description')
    .setVersion('1.0')
    .addTag('User Admin Service')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('api', app, document);
  //}
  //app.enableCors();
  await app.listen(3000);
}
bootstrap();
