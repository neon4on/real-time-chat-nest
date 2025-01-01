import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet'; 
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // Настройка CORS
  app.use(cors({
    origin: 'http://your-frontend-domain.com', // Чуть позже заменю на свой домен фронтенда
    credentials: true,
  }));

  // Защита с помощью Helmet
  app.use(helmet());

  // Парсер куки
  app.use(cookieParser());

  // CSRF защита
  app.use(csurf({ cookie: true }));

  // Глобальная валидация
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log('Сервер запущен на http://localhost:3000');
}
bootstrap();
