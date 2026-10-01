import { DatabaseService } from '../core/database.service';
import { PingService } from './ping.service';

describe('PingService', () => {
  it('responde pong con la version de la base de datos', () => {
    const database = {
      consultarValor: jest.fn().mockReturnValue('3.44.0'),
    } as unknown as DatabaseService;

    const respuesta = new PingService(database).ping();

    expect(respuesta).toEqual({
      RESPUESTA: 'pong',
      ESTADO: 1,
      BASEDEDATOS: 'SQLite 3.44.0',
    });
  });
});
