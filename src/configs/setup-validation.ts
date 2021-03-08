import { INestApplication, ValidationPipe } from '@nestjs/common';

export function setupValidation(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe());
}
