# Pruebas E2E con Serenity/JS, Playwright y Cucumber

Proyecto educativo avanzado que implementa el patrón Screenplay para pruebas
web y API. Incluye una aplicación local, reporte Serenity/JS, escenarios
Gherkin, etiquetas, TypeScript estricto y ejecución continua.

## Arquitectura

| Componente | Responsabilidad | Ubicación |
|---|---|---|
| Actor y abilities | Navegación web y llamadas HTTP | `features/support/serenity.config.ts` |
| Features | Comportamiento en lenguaje Gherkin | `features/*.feature` |
| Step definitions | Conectan Gherkin con Screenplay | `features/step-definitions/` |
| Tasks | Objetivos de negocio reutilizables | `test/tasks/` |
| Questions | Información consultada por el actor | `test/questions/` |
| Lean Page Objects | Elementos y selectores | `test/ui/` |
| Sistema de prueba | Aplicación web y API locales | `demo_app/`, `test/support/` |

Los steps no contienen selectores ni llamadas directas a Playwright. Toda la
automatización se expresa mediante actores, tareas, interacciones y preguntas.

## Requisitos

- Node.js 22.22.2 o 24.15.0 en adelante dentro de esas ramas.
- npm.

## Instalación

En PowerShell, desde la raíz:

```powershell
npm install
npx playwright install chromium
```

Si Playwright solicita componentes del sistema en Linux:

```bash
npx playwright install --with-deps chromium
```

## Ejecutar las pruebas

Todas las pruebas web y API:

```powershell
npm test
```

Solo el conjunto rápido:

```powershell
npm run test:smoke
```

Solo pruebas web:

```powershell
npm run test:web
```

Solo pruebas API:

```powershell
npm run test:api
```

Una característica:

```powershell
npm test -- features/authentication.feature
```

Un escenario por nombre:

```powershell
npm test -- --name "Agregar un producto al carrito"
```

Mostrar el navegador:

```powershell
$env:HEADLESS = "false"
npm run test:web
Remove-Item Env:HEADLESS
```

Validar TypeScript sin ejecutar las pruebas:

```powershell
npm run typecheck
```

## Reporte

Cada ejecución genera el reporte en:

```text
reports/serenity-js/index.html
```

Para servirlo localmente:

```powershell
npm run test:report
```

Luego visite `http://localhost:8080`.

## Escenarios incluidos

- autenticación correcta e incorrecta;
- búsqueda y filtrado del catálogo;
- adición de productos al carrito;
- consulta completa de productos mediante API;
- filtrado de productos mediante parámetros HTTP;
- validación de estado y cuerpo JSON.

## Ruta sugerida para la clase

1. Lea primero los archivos `.feature`.
2. Identifique al actor y sus abilities.
3. Siga un step hasta una Task.
4. Diferencie Tasks, Interactions, Questions y Lean Page Objects.
5. Compare un escenario web con uno API.
6. Ejecute las etiquetas y revise el reporte.
7. Resuelva `ejercicios/README.md`.

## Buenas prácticas aplicadas

- aplicación y API locales para evitar pruebas frágiles;
- steps sin selectores ni lógica de automatización;
- credenciales ficticias y contraseña enmascarada;
- tareas pequeñas, reutilizables y con lenguaje del dominio;
- pruebas web y API bajo el mismo modelo de actores;
- reportes oficiales de Serenity/JS;
- TypeScript estricto y pipeline de GitHub Actions;
- exclusión de `node_modules`, navegadores y reportes generados.

