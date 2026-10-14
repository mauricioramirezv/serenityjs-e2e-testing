# Pruebas con Gherkin, Cucumber y Serenity/JS

Proyecto educativo para describir comportamientos con **Gherkin** y automatizar pruebas web y API con **Cucumber, Serenity/JS, Playwright y TypeScript**.

Incluye una aplicación local llamada **Serenity Shop**. La aplicación se inicia y se detiene automáticamente durante las pruebas.

## 1. Requisitos

- Node.js **22.22.2** o una versión de la rama **24 desde 24.15.0**.
- npm.
- Visual Studio Code recomendado.

Compruebe las versiones:

```powershell
node --version
npm --version
```

## 2. Instalación

Abra la carpeta del proyecto en Visual Studio Code y ejecute desde su terminal:

```powershell
npm ci
npx playwright install chromium
```

Los comandos deben ejecutarse en la carpeta que contiene `package.json`.

## 3. Primera ejecución

Compruebe el código y la definición de los escenarios:

```powershell
npm run typecheck
npm run test:gherkin
```

Después ejecute los ejemplos de clase:

```powershell
npm run test:clase
```

**Importante:** `test:gherkin` realiza una comprobación sin ejecutar las pruebas. Que muestre `skipped` es normal y no significa que la aplicación haya sido validada.

## 4. Ejemplos incluidos

| Archivo en `features/` | Qué permite practicar |
|---|---|
| `elementos.feature` | Comprobar que los campos y el botón están visibles. |
| `authentication.feature` | Login correcto e incorrecto con escenarios simples. |
| `autenticacion_parametrizada.feature` | Login válido, usuario inválido y contraseña inválida mediante una tabla de ejemplos. |
| `busqueda_sin_resultados.feature` | Buscar un producto inexistente y verificar una lista vacía. |
| `catalog.feature` | Buscar, filtrar y agregar productos al carrito. |
| `api.feature` | Validar el estado HTTP y los datos de una respuesta. |

Las credenciales de demostración son:

- **Usuario:** `estudiante`
- **Contraseña:** `screenplay`

Son datos ficticios para esta práctica.

## 5. Cómo leer Gherkin

Los archivos en español comienzan con:

```gherkin
# language: es
```

Cada palabra clave tiene una función:

| Palabra clave | Función |
|---|---|
| `Característica` | Agrupa comportamientos de una funcionalidad. |
| `Escenario` | Describe un caso concreto. |
| `Dado` | Establece el contexto inicial. |
| `Cuando` | Describe la acción. |
| `Entonces` | Define el resultado esperado. |
| `Y` | Añade otro paso o comprobación. |
| `Antecedentes` | Prepara un contexto común antes de cada escenario. |
| `Esquema del escenario` | Define un caso parametrizado. |
| `Ejemplos` | Proporciona una fila de datos por ejecución. |

Ejemplo:

```gherkin
# language: es
Característica: Autenticación

  Escenario: Iniciar sesión con datos válidos
    Dado Alicia abre la aplicación
    Cuando ella inicia sesión con usuario "estudiante" y contraseña "screenplay"
    Entonces ella observa el mensaje "Inicio de sesión exitoso"
    Y ella observa el catálogo "visible"
```

**Una prueba negativa pasa cuando confirma el rechazo esperado.** Por ejemplo, una contraseña incorrecta debe producir un mensaje de error y mantener oculto el catálogo.

## 6. Comandos de ejecución

| Objetivo | Comando |
|---|---|
| Todos los escenarios | `npm test` |
| Cinco casos nuevos de clase | `npm run test:clase` |
| Pruebas web | `npm run test:web` |
| Pruebas API | `npm run test:api` |
| Escenarios etiquetados como `@smoke` | `npm run test:smoke` |
| Comprobar TypeScript | `npm run typecheck` |
| Comprobar Gherkin sin ejecutar | `npm run test:gherkin` |
| Abrir el reporte | `npm run test:report` |

Para ejecutar un archivo:

```powershell
npm test -- features/autenticacion_parametrizada.feature
```

Para mostrar el navegador durante las pruebas en PowerShell:

```powershell
$env:HEADLESS = "false"
npm run test:clase
Remove-Item Env:HEADLESS
```

## 7. Organización del proyecto

| Carpeta | Contenido |
|---|---|
| `features/` | Escenarios Gherkin. |
| `features/step-definitions/` | Código que implementa los pasos. |
| `features/support/` | Configuración de actores, navegador y servidor. |
| `test/tasks/` | Tareas como iniciar sesión o buscar productos. |
| `test/questions/` | Consultas sobre el estado de la aplicación. |
| `test/ui/` | Elementos y selectores de la interfaz. |
| `demo_app/` | Aplicación de demostración. |
| `ejercicios/` | Guías y actividades. |

Para comprender un ejemplo, siga este orden: **escenario, definición del paso, tarea y comprobación del resultado**.

## 8. Resultados y actividad

Después de ejecutar las pruebas:

```powershell
npm run test:report
```

El reporte permite revisar escenarios, acciones y resultados. Un caso aprobado confirma las comprobaciones definidas en ese caso.

Actividad:

1. Ejecute el ejemplo de elementos y el de autenticación.
2. Identifique el contexto, la acción y el resultado esperado.
3. Agregue una fila a la tabla de ejemplos.
4. Cambie temporalmente un resultado esperado para provocar un fallo.
5. Explique la causa y restaure el valor correcto.

Entregue el archivo modificado y evidencias de un caso aprobado y otro fallido.

## 9. Problemas frecuentes

- **No encuentra `package.json`:** abra la terminal en la carpeta raíz del proyecto.
- **No encuentra Chromium:** ejecute `npx playwright install chromium`.
- **Paso indefinido:** revise que el texto coincida con una definición de pasos.
- **Falla una aserción:** compare el resultado esperado con el obtenido.
- **Error de sintaxis:** use dos puntos después de `Característica` y `Escenario`, pero no después de `Dado`, `Cuando` o `Entonces`.