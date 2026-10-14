# Práctica de Gherkin con Serenity/JS

Esta práctica utiliza la aplicación local Serenity Shop incluida en el proyecto.
No depende de The Internet ni de las tiendas de los ejemplos anteriores.
El formulario usa credenciales ficticias y una validación en el navegador:
sirve para aprender pruebas, no representa una autenticación de producción.

## Preparación en Windows

1. Abra la carpeta del proyecto en Visual Studio Code.
2. Abra una terminal PowerShell desde esa carpeta.
3. Use Node.js 22.22.2 o una versión compatible de la rama 24 desde 24.15.0.
4. Instale las dependencias y el navegador:

```powershell
npm ci
npx playwright install chromium
```

La aplicación local se inicia y se detiene automáticamente con las pruebas.
No necesita abrir otro servidor ni configurar una URL o puerto fijo.

## Comprobación previa

```powershell
npm run typecheck
npm run test:gherkin
```

El primer comando comprueba TypeScript. El segundo analiza los escenarios y
su correspondencia con las definiciones de pasos. En el dry-run, `skipped`
es esperado porque no se ejecutan acciones ni aserciones. Un dry-run correcto
no demuestra que la aplicación se comporte correctamente.

## Orden de los ejemplos

| Orden | Archivo | Qué demuestra |
|---|---|---|
| 1 | `features/elementos.feature` | Encontrar los campos y el botón antes de utilizarlos |
| 2 | `features/authentication.feature` | Escenarios simples de login correcto e incorrecto, con palabras clave en inglés |
| 3 | `features/autenticacion_parametrizada.feature` | Palabras clave en español, esquema del escenario y tabla de ejemplos |
| 4 | `features/busqueda_sin_resultados.feature` | Antecedentes, una búsqueda negativa y varias comprobaciones |
| 5 | `features/catalog.feature` | Búsqueda positiva, filtro, tablas de datos y carrito |
| 6 | `features/api.feature` | Comportamiento del servicio HTTP |

Por ejemplo, ejecute el primer archivo:

```powershell
npm test -- features/elementos.feature
```

Ejecute el ejemplo parametrizado:

```powershell
npm test -- features/autenticacion_parametrizada.feature
```

Ejecute solamente los cinco casos nuevos:

```powershell
npm run test:clase
```

Ejecute todos los escenarios:

```powershell
npm test
```

## Explicación del ejemplo parametrizado

`# language: es` selecciona el dialecto español de Gherkin. Las palabras clave
cambian, pero el texto de los pasos coincide con las definiciones del proyecto.

- **Dado** establece el contexto: Alicia abre la aplicación.
- **Cuando** expresa la acción: inicia sesión con los datos de la fila.
- **Entonces** comprueba el mensaje.
- **Y** añade la comprobación de acceso al catálogo.
- **Esquema del escenario** define un escenario reutilizable.
- **Ejemplos** aporta una fila de datos por ejecución.

| Caso | Usuario | Contraseña | Mensaje | Catálogo |
|---|---|---|---|---|
| Credenciales válidas | estudiante | screenplay | Inicio de sesión exitoso | Visible |
| Usuario inválido | incorrecto | screenplay | Credenciales inválidas | Oculto |
| Contraseña inválida | estudiante | incorrecta | Credenciales inválidas | Oculto |

Cada caso negativo cambia una entrada por vez. La prueba pasa cuando confirma
el rechazo y que el catálogo permanece oculto.

## De Gherkin a la automatización

1. Lea el escenario en `features/autenticacion_parametrizada.feature`.
2. Busque sus pasos de navegación, login y mensaje en
   `features/step-definitions/web.steps.ts`.
3. Siga el login hasta `test/tasks/Authenticate.ts`.
4. Identifique los elementos en `test/ui/LoginForm.ts`.
5. Consulte el mensaje mediante `test/questions/ShopQuestions.ts`.
6. Revise las comprobaciones de catálogo y elementos en
   `features/step-definitions/classroom.steps.ts`.

Los escenarios usan lenguaje del dominio. Las tareas agrupan acciones y las
aserciones comparan los resultados. Los selectores permanecen en `test/ui/`.

## Búsqueda sin resultados

La prueba verifica una lista vacía después de buscar un nombre inexistente.
También confirma que el catálogo siga visible. Así evita aprobar solamente
porque una pantalla oculta no muestra productos.

`Antecedentes` prepara el contexto de cada escenario. Una tabla de datos de un
paso, como la de `catalog.feature`, aporta información a ese paso. La tabla
`Ejemplos` genera ejecuciones independientes del esquema del escenario.

## Ejercicios para los estudiantes

1. Agregue una fila con usuario y contraseña incorrectos y justifique el esperado.
2. Agregue un escenario de búsqueda que encuentre `Clean Code`.
3. Ejecute únicamente `@clase and @negativo`:

```powershell
npm test -- --tags "@clase and @negativo"
```

4. Cambie temporalmente un mensaje esperado, ejecute el caso y explique el fallo.
   Restaure el texto antes de entregar.
5. Explique qué diferencia hay entre encontrar un elemento, comprobar su
   visibilidad y validar el comportamiento de una funcionalidad.

## Evidencias

```powershell
npm run test:report
```

Registre archivo, escenario, datos, esperado, obtenido y resultado. Incluya
evidencia de un caso aprobado y otro fallido. No complete resultados de pruebas
que no haya ejecutado.

## Comprobación de esta actualización

- TypeScript: correcto.
- Dry-run Gherkin: 12 escenarios y 42 pasos reconocidos, sin pasos indefinidos.
- API: los dos escenarios existentes ejecutados correctamente.
- Navegador: pendiente de ejecución. En el entorno de preparación no se pudo
  descargar Chromium, por lo que no se afirma que los nuevos escenarios web
  hayan pasado. Ejecútelos en su computador después de instalar el navegador.
