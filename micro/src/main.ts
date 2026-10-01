import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorFilter } from './common/error.filter';

// Puerto propio (8082): no choca con Payara (8081) ni con el proyecto real (8080).
const PUERTO = process.env.PORT ?? 8082;
// Mismo nombre de variable que el backend Java.
const ORIGEN_PERMITIDO = process.env.ORIGEN_PERMITIDO ?? 'http://localhost:3002';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: ORIGEN_PERMITIDO });
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(PUERTO);
}
bootstrap();
