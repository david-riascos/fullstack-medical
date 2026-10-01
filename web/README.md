# web — frontend Angular (stack Angular + NestJS)

Frontend de práctica en **Angular 16** (módulos `NgModule`, `HttpClient`) con un botón **"Probar backend"** que llama a `GET api/ping` del
backend hermano `../micro` (NestJS). Todo el contenido es ficticio y educativo.

## Stack

| Pieza | Detalle |
|---|---|
| Framework | Angular **16.2** (la última línea que soporta Node 16), RxJS 7.8, TypeScript 5.1 |
| Pruebas | Karma + Jasmine |
| Herramientas | Node 16.16 y **yarn** |
| Puerto | **3002** (configurado en `angular.json`; el 4200 típico de Angular **no** se usa) |

## Cómo correrlo

```powershell
cd web
yarn install
yarn start          # ng serve -> http://localhost:3002
yarn build          # compila a dist/
```

El backend debe estar encendido en el 8082 (`../micro`).

## Configuración

La URL del backend está en un solo lugar: `src/environments/environment.ts` → `urlApi: 'http://localhost:8082/api/'`.
Hay un único archivo de entorno: **no hay uno de producción** (`fileReplacements`) todavía.

## Estructura (`src/app/`)

| Archivo | Responsabilidad |
|---|---|
| `app.component.ts / .html / .css` | Pantalla con el botón, estado de carga y mensaje de resultado |
| `services/ping.service.ts` | Único lugar que usa `HttpClient` |
| `models/respuesta.ts` | Contrato `Respuesta` (`RESPUESTA`, `ESTADO`, `BASEDEDATOS?`) |
| `app.module.ts` | Importa `HttpClientModule` |

Si el backend falla, el usuario ve un mensaje genérico ("No se pudo conectar con el backend"): no se muestran detalles técnicos.

## Pruebas

```powershell
yarn ng test --watch=false --browsers=ChromeHeadless     # 2 pruebas, requiere Chrome instalado
```

`yarn test` a secas abre Chrome con interfaz y se queda en modo *watch*. Las pruebas cubren `AppComponent` con un `PingService` falso
(caso de éxito y caso de error).

## Trampas ya resueltas (no repetir)

- `package.json` lleva `resolutions.node-releases = 2.0.44` (con Node 16.16 falla la instalación con versiones más nuevas). Usa **yarn**: `npm` ignora `resolutions`.
- No subas Angular ni su CLI sin subir Node (la 17 pide Node 18).

## Estado de verificación (2026-09-25)

`yarn build` ✔ · `ng test` ✔ (2) · clic real en Chrome contra el backend NestJS: `pong (SQLite …)` sin errores de consola ✔.
