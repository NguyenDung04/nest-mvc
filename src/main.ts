/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { join } from 'path';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);

  const appName = configService.get<string>('APP_NAME', 'nest-mvc');
  const appEnv = configService.get<string>('NODE_ENV', 'development');
  const appPort = Number(configService.get<number>('APP_PORT', 8080));
  const appHost = configService.get<string>('APP_HOST', '0.0.0.0');
  const appUrl = configService.get<string>(
    'APP_URL',
    `http://localhost:${appPort}`,
  );
  const apiPrefix = configService.get<string>('API_PREFIX', 'api');

  const enableSwagger =
    configService.get<string>('ENABLE_SWAGGER', 'true') === 'true';
  const enableHelmet =
    configService.get<string>('ENABLE_HELMET', 'true') === 'true';
  const enableCors =
    configService.get<string>('ENABLE_CORS', 'true') === 'true';

  const corsOrigins = configService
    .get<string>('CORS_ORIGIN', 'http://localhost:8080,http://localhost:3001')
    .split(',')
    .map((origin) => origin.trim());

  app.set('trust proxy', 1);

  app.use(
    cookieParser(
      configService.get<string>('COOKIE_SECRET', 'super-cookie-secret'),
    ),
  );

  if (enableHelmet) {
    app.use(
      helmet({
        contentSecurityPolicy: appEnv === 'production' ? undefined : false,
        crossOriginEmbedderPolicy: false,
      }),
    );
    logger.log('Helmet enabled');
  } else {
    logger.warn('Helmet disabled by env');
  }

  if (enableCors) {
    app.enableCors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (corsOrigins.includes(origin)) return callback(null, true);

        return callback(
          new Error(`Origin ${origin} not allowed by CORS`),
          false,
        );
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-CSRF-Token',
        'X-Request-Id',
      ],
      exposedHeaders: ['set-cookie', 'X-Request-Id'],
    });

    logger.log(`CORS enabled for: ${corsOrigins.join(', ')}`);
  } else {
    logger.warn('CORS disabled by env');
  }

  app.setGlobalPrefix(apiPrefix, {
    exclude: ['/', '/health', '/docs', '/docs-json', '/favicon.ico'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      stopAtFirstError: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  app.useStaticAssets(join(process.cwd(), 'public'), {
    prefix: '/public/',
  });

  app.setBaseViewsDir(join(process.cwd(), 'src', 'views'));
  app.setViewEngine('hbs');

  app.use((req: any, res: any, next: () => void) => {
    res.locals.csrfToken = '';
    next();
  });

  if (enableSwagger) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(`${appName} API`)
      .setDescription('API documentation for NestJS MVC + REST project')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });

    logger.log(`${appName} Swagger available at ${appUrl}/docs`);
  } else {
    logger.warn('Swagger disabled by env');
  }

  await app.listen(appPort, appHost);

  logger.log(`${appName} is running on ${appUrl}`);
  logger.log(`Environment: ${appEnv}`);
  logger.log(`API Prefix: /${apiPrefix}`);
}

bootstrap();
