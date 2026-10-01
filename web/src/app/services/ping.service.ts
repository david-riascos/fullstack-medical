import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Respuesta } from '../models/respuesta';

@Injectable({ providedIn: 'root' })
export class PingService {
  constructor(private readonly http: HttpClient) {}

  ping(): Observable<Respuesta> {
    return this.http.get<Respuesta>(`${environment.urlApi}ping`);
  }
}
