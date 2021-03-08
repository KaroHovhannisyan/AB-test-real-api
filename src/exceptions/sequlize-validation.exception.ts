import { InternalServerErrorException } from '@nestjs/common';

export class SequlizeValidationException extends InternalServerErrorException {
  constructor(error?: string | object | any) {
    if (error && error.response) {
      super(
        error.response.errors
          ? error.response.errors[0].message
          : error.response.message,
      );
    } else {
      super(`Something went wrong`, error);
    }
  }
}
