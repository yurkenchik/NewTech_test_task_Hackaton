import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from "process";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const PORT = process.env.PORT || 9000
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle("Advanced backend on nest.js course")
      .setDescription("Rest API documentation")
      .setVersion("1.0.0")
      .addTag("Yuriy")
      .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("/api/docs", app, document)

  await app.listen(PORT, () => console.log(`Server is listenning on port: ${PORT}`));

}
bootstrap();
