import { Component } from '@angular/core';

import { PingService } from './services/ping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  cargando = false;
  mensaje = '';
  exito = false;

  constructor(private readonly pingService: PingService) {}

  probarBackend(): void {
    this.cargando = true;
    this.pingService.ping().subscribe({
      next: ({ RESPUESTA, ESTADO, BASEDEDATOS }) => {
        this.exito = ESTADO > 0;
        this.mensaje = `${RESPUESTA} (${BASEDEDATOS})`;
        this.cargando = false;
      },
      error: () => {
        // No se muestran detalles tecnicos al usuario.
        this.exito = false;
        this.mensaje = 'No se pudo conectar con el backend';
        this.cargando = false;
      },
    });
  }
}
