import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  // Global prefix for all routes
  app.setGlobalPrefix('api');
  
  await app.listen(5000);
  console.log('Backend server running on http://localhost:5000');
}
bootstrap();