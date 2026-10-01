# micro — backend NestJS (stack Angular + NestJS)

Backend de práctica en **NestJS 10 + TypeScript**, con la misma forma que los demás stacks: `controller → service → core`, respuesta estándar
`{"RESPUESTA","ESTADO"}` y un único endpoint `GET /api/ping`. Su frontend es `../web` (Angular). Todo el contenido es ficticio y educativo.

## Stack

| Pieza | Detalle |
|---|---|
| Framework | NestJS **10.4.15** (plataforma Express), CLI `@nestjs/cli` **9.5.0** |
| Lenguaje | TypeScript 5 (`esModuleInterop` activado en `tsconfig.json`) |
| Base de datos | `sql.js` 1.10.3 (SQLite en JavaScript puro, **en memoria**): evita compilar módulos nativos en Windows |
| Pruebas | Jest 29 |
| Herramientas | Node 16.16 y **yarn** |
| Puerto | **8082** |

## Cómo correrlo

```powershell
cd micro
yarn install
yarn build
node dist/main            # http://localhost:8082/api/ping
```

`yarn start:dev` (recarga automática) existe en `package.json`, pero **no lo he probado**; lo verificado es `yarn build` + `node dist/main`.

## Endpoint

| Método y ruta | Respuesta |
|---|---|
| `GET /api/ping` | `200` `{"RESPUESTA":"pong","ESTADO":1,"BASEDEDATOS":"SQLite 3.45.2"}` |
| Cualquier error / ruta inexistente | Mismo status HTTP que el error (una ruta inexistente da `404`; un error no controlado, `400`) con cuerpo `{"RESPUESTA":"Ocurrio un error al procesar la solicitud","ESTADO":0}` — el detalle va solo al log |

## Configuración (variables de entorno)

| Variable | Por defecto | Para qué |
|---|---|---|
| `PORT` | `8082` | Puerto |
| `ORIGEN_PERMITIDO` | `http://localhost:3002` | Único origen aceptado por CORS |

La base de datos **no** es configurable todavía (`DB_URL` no se lee): siempre es SQLite en memoria.

## Estructura (`src/`)

| Archivo | Capa | Responsabilidad |
|---|---|---|
| `main.ts` | arranque | Prefijo `api`, CORS, filtro global de errores, puerto |
| `ping/ping.controller.ts` | controller | Solo delega |
| `ping/ping.service.ts` | service | Lógica: consulta la versión de SQLite |
| `ping/ping.module.ts`, `app.module.ts` | módulos | Cableado de Nest |
| `core/database.service.ts`, `core/core.module.ts` | core | Único acceso a la BD (`sql.js`) |
| `common/respuesta.ts` | modelo | Contrato `Respuesta` |
| `common/error.filter.ts` | errores | Filtro global: respuesta estándar sin detalles internos |
| `ping/ping.service.spec.ts` | prueba | Prueba unitaria del servicio con una BD falsa |

## Pruebas

```powershell
yarn test          # 1 prueba unitaria (Jest)
```

`yarn test:e2e` está declarado en `package.json` pero **no hay pruebas e2e** todavía (se quitó la de ejemplo del generador). `yarn lint` usa `--fix`, es decir, modifica archivos.

## Trampas ya resueltas (no repetir)

Con Node 16.16, las versiones recientes fallan por `engines`. Ya están fijadas con versiones exactas; **no las subas sin subir Node**:

- `resolutions.node-releases = 2.0.44` (última 2.x sin restricción de engine).
- NestJS en 10.4.15 (las siguientes traen `file-type`, que pide Node 18) y `@nestjs/cli` en 9.5.0 (el 10 arrastra `@angular-devkit` 17, que pide Node 18).
- `@typescript-eslint` en 6.21.0 y `@types/express` en 4 (la versión que usa Nest 10 por dentro).

## Estado de verificación (2026-09-25)

`yarn build` ✔ · `yarn test` ✔ (1) · `ping`, CORS y formato de error comprobados con `curl` ✔ · clic real desde el frontend Angular en Chrome ✔.
