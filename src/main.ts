import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './exceptions/all-exception.filter';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from './config/swagger';

/**
 * Boots the NestJS application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      forbidNonWhitelisted: true
      // exceptionFactory: (errors) => new ValidationException(errors),
    })
  );

  app.useGlobalFilters(new AllExceptionFilter());
  app.enableCors({
    origin: [
      'https://accounts.google.com', // Google OAuth server domain
      'http://localhost:5173',
      'https://outsider987.github.io',
      'https://aha-frontend-lemon.vercel.app',
      'https://vercel.app',
      'https://aha-frontedn.fly.dev'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    // exposedHeaders: ['set-cookie', 'Access-Control-Allow-Origin', 'Origin'],
    // optionsSuccessStatus: 200,
    exposedHeaders: ['set-cookie'],
    allowedHeaders: [
      'content-type',
      'Authorization',
      'Access-Control-Allow-Origin'
    ]
  });
  app.use(cookieParser());
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
