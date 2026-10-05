@web
Feature: Catálogo
  Como estudiante autenticado
  Quiero buscar, filtrar y seleccionar productos
  Para practicar un flujo E2E completo

  Background:
    Given Bruno ingresó correctamente a la aplicación

  Scenario: Buscar un producto
    When él busca "TypeScript"
    Then él observa solamente los productos:
      | Testing TypeScript |

  Scenario: Filtrar por categoría
    When él selecciona la categoría "Cursos"
    Then él observa solamente los productos:
      | Curso Screenplay |

  @smoke
  Scenario: Agregar un producto al carrito
    When él agrega "Clean Code" al carrito
    Then el carrito contiene 1 producto

