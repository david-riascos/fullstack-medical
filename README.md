# fullstack-medical

Práctica de **Angular 16 + NestJS 10**: réplica mínima y ficticia de flujos de historia clínica (HIS), como parte de un
laboratorio de comparación de stacks (el mismo problema resuelto en Nuxt+Java, React+FastAPI, Blazor+C#, Laravel, etc.).

Todo el contenido —pacientes, usuarios, datos clínicos— es **ficticio y educativo**: no contiene información real de
pacientes ni de ningún sistema en producción.

## Estructura

| Carpeta | Rol | Detalle |
|---|---|---|
| [`micro/`](micro/) | Backend | NestJS 10.4.15, `sql.js` (SQLite en memoria), puerto **8082** |
| [`web/`](web/) | Frontend | Angular 16.2, puerto **3002** |

Capas en `micro/`: `controller` (solo delega) → `service` (lógica) → `core` (único que toca la base de datos).

Contrato de respuesta común a todos los endpoints:

```json
{ "RESPUESTA": "...", "ESTADO": 1, "BASEDEDATOS": "..." }
```

`ESTADO > 0` indica éxito. Ante un error, la API responde con el mismo status HTTP y `ESTADO: 0`, sin exponer detalles
internos (el detalle solo queda en el log del servidor).

## Cómo correrlo

Requisitos: Node 16.16 y `yarn` (no usar `npm`, hay `resolutions` en `package.json` que dependen de `yarn`).

```powershell
# Backend
cd micro
yarn install
yarn build
node dist/main            # http://localhost:8082/api/ping

# Frontend (en otra terminal)
cd web
yarn install
yarn start                 # http://localhost:3002
```

El frontend necesita el backend encendido en el puerto 8082 (`web/src/environments/environment.ts` → `urlApi`).

## Estado actual

Por ahora el proyecto es solo el andamiaje base: un único endpoint `GET api/ping` en el backend y un botón
"Probar backend" en el frontend que lo consume. Aún no hay flujos de dominio (login, usuarios, pacientes, etc.).

## Pruebas

```powershell
cd micro
yarn test

cd web
yarn test
```

## Variables de entorno (`micro/`)

| Variable | Por defecto | Para qué |
|---|---|---|
| `PORT` | `8082` | Puerto del backend |
| `ORIGEN_PERMITIDO` | `http://localhost:3002` | Único origen aceptado por CORS |
