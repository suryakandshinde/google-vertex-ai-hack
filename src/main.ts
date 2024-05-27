import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const config = new DocumentBuilder()
  .setTitle('Demo API')
  .setDescription('An SDK for Demo')
  .setVersion('1.0')
  .addServer(process.env.SERVER_URL)
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const PORT = process.env.PORT || 3000;

  await app.listen(PORT);
}

bootstrap();
