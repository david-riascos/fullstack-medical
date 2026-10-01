/** Respuesta estandar: ESTADO > 0 es exito, ESTADO 0 se devuelve como HTTP 400. */
export interface Respuesta {
  RESPUESTA: string;
  ESTADO: number;
  BASEDEDATOS?: string;
}
