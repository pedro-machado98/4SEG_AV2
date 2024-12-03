import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
 import { swaggerOptions, swaggerTitle, swaggerDescription } from './common';
 './common'
export async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:WinstonModule.createLogger({
      transports: [
        new transports.File({
          filename: 'logs/error.log',
          level: 'error',
          format: format.combine(
            format.timestamp(),
            format.json()
          ),
        }),
        new transports.File({
          filename: 'logs/combined.log',
          format: format.combine(
            format.timestamp(),
            format.json()
          ),
        }),
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.simple(),
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.printf((info) => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            }),
          ),
        }),
      ]
    })
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // Swagger Configuration --------------------------------

  // swaggerOptions, swaggerTitle, swaggerDescription variables are customized and defined in common/swagger/swagger.config.ts

  const config = new DocumentBuilder()
    .setTitle(swaggerTitle)
    .setDescription(swaggerDescription)
    //.setContact('{ jc - develop }',  'https://github.com/JulianCallejas', 'micorreo@example.com')    //contact options website and email
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api', app, document, swaggerOptions);

  // End Swagger Configurations --------------------------------


  //Enable CORS
  app.enableCors();


  await app.listen(3000);
  Logger.log(`App running on Port 3000`);


}
bootstrap();


