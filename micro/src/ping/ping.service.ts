import { Injectable } from '@nestjs/common';
import { Respuesta } from '../common/respuesta';
import { DatabaseService } from '../core/database.service';

@Injectable()
export class PingService {
  constructor(private readonly database: DatabaseService) {}

  /** Responde pong y confirma que la base de datos contesta. */
  ping(): Respuesta {
    const version = this.database.consultarValor('SELECT sqlite_version()');
    return { RESPUESTA: 'pong', ESTADO: 1, BASEDEDATOS: `SQLite ${version}` };
  }
}
