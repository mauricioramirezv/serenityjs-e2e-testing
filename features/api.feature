@api
Feature: API del catálogo
  Como sistema consumidor
  Quiero consultar los productos mediante HTTP
  Para verificar el contrato del servicio

  @smoke
  Scenario: Consultar todos los productos
    When Api consulta todos los productos
    Then la respuesta HTTP tiene estado 200
    And la respuesta contiene 3 productos

  Scenario: Consultar productos por categoría
    When Api consulta los productos de la categoría "books"
    Then la respuesta HTTP tiene estado 200
    And la respuesta contiene 2 productos
    And el primer producto se llama "Clean Code"

