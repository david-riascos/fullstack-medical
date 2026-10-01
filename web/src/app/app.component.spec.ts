import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { AppComponent } from './app.component';
import { PingService } from './services/ping.service';

describe('AppComponent', () => {
  function crear(ping: () => unknown) {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: PingService, useValue: { ping } }],
    });
    return TestBed.createComponent(AppComponent).componentInstance;
  }

  it('muestra pong cuando el backend responde', () => {
    const app = crear(() => of({ RESPUESTA: 'pong', ESTADO: 1, BASEDEDATOS: 'SQLite' }));

    app.probarBackend();

    expect(app.exito).toBeTrue();
    expect(app.mensaje).toBe('pong (SQLite)');
    expect(app.cargando).toBeFalse();
  });

  it('muestra un mensaje generico cuando el backend falla', () => {
    const app = crear(() => throwError(() => new Error('detalle interno')));

    app.probarBackend();

    expect(app.exito).toBeFalse();
    expect(app.mensaje).toBe('No se pudo conectar con el backend');
  });
});
