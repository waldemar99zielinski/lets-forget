import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  // await app.listen(3000, '192.168.0.100');
  await app.listen(3000);
  console.log('done')
}
bootstrap();
