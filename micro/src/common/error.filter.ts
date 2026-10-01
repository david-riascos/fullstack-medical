import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { Respuesta } from './respuesta';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorFilter.name);

  catch(error: unknown, host: ArgumentsHost): void {
    const respuesta = host.switchToHttp().getResponse<Response>();
    const cuerpo: Respuesta = {
      RESPUESTA: 'Ocurrio un error al procesar la solicitud',
      ESTADO: 0,
    };

    // El detalle va al log; al cliente no se le exponen datos internos.
    this.logger.error(error instanceof Error ? error.stack : String(error));

    const status = error instanceof HttpException ? error.getStatus() : 400;
    respuesta.status(status).json(cuerpo);
  }
}
