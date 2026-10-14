# language: es
@web @clase @negativo
Característica: Búsqueda sin coincidencias
  Como estudiante autenticado
  Quiero consultar productos por nombre
  Para identificar cuándo no existen coincidencias

  Antecedentes:
    Dado Bruno ingresó correctamente a la aplicación

  Escenario: Buscar un producto inexistente
    Cuando él busca "zzzz_producto_inexistente_987654"
    Entonces él no observa productos en el catálogo
    Y él observa el catálogo "visible"
