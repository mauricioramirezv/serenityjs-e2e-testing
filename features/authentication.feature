@web
Feature: Autenticación
  Como estudiante
  Quiero ingresar a la aplicación
  Para consultar el catálogo de aprendizaje

  @smoke
  Scenario: Inicio de sesión correcto
    Given Alicia abre la aplicación
    When ella inicia sesión con usuario "estudiante" y contraseña "screenplay"
    Then ella observa el mensaje "Inicio de sesión exitoso"

  Scenario: Credenciales inválidas
    Given Alicia abre la aplicación
    When ella inicia sesión con usuario "incorrecto" y contraseña "incorrecta"
    Then ella observa el mensaje "Credenciales inválidas"

