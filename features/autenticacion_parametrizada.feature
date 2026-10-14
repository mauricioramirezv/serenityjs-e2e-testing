# language: es
@web @clase @parametrizado
Característica: Validación del acceso al catálogo
  Como estudiante
  Quiero recibir una respuesta verificable al iniciar sesión
  Para acceder al catálogo solamente con credenciales válidas

  Esquema del escenario: Acceso con <caso>
    Dado Alicia abre la aplicación
    Cuando ella inicia sesión con usuario "<usuario>" y contraseña "<clave>"
    Entonces ella observa el mensaje "<mensaje>"
    Y ella observa el catálogo "<estado>"

    Ejemplos:
      | caso                 | usuario    | clave      | mensaje                  | estado  |
      | credenciales válidas | estudiante | screenplay | Inicio de sesión exitoso | visible |
      | usuario inválido     | incorrecto | screenplay | Credenciales inválidas   | oculto  |
      | contraseña inválida  | estudiante | incorrecta | Credenciales inválidas   | oculto  |
