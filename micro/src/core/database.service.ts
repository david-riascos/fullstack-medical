import { Injectable, OnModuleInit } from '@nestjs/common';
import initSqlJs, { Database } from 'sql.js';

/** Equivalente a DBPool del backend Java: unico punto de acceso a la base de datos. */
@Injectable()
export class DatabaseService implements OnModuleInit {
  private db!: Database;

  async onModuleInit(): Promise<void> {
    const SQL = await initSqlJs();
    // Por defecto en memoria, como H2: se borra al apagar.
    this.db = new SQL.Database();
  }

  consultarValor(sql: string): string {
    const [resultado] = this.db.exec(sql);
    return String(resultado.values[0][0]);
  }
}
