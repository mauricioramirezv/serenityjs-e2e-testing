# language: es
@web @clase @basico
Característica: Elementos del formulario de ingreso
  Como estudiante
  Quiero identificar los elementos del formulario
  Para comprobar que están disponibles antes de usarlos

  Escenario: Encontrar campos y botón de ingreso
    Dado Alicia abre la aplicación
    Entonces ella observa el elemento "usuario"
    Y ella observa el elemento "contraseña"
    Y ella observa el elemento "botón de ingreso"
