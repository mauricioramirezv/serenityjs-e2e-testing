import { Then, When } from '@cucumber/cucumber';
import { Ensure, equals } from '@serenity-js/assertions';
import { Actor, actorInTheSpotlight } from '@serenity-js/core';
import { LastResponse } from '@serenity-js/rest';

import { Product } from '../../test/support/demoServer';
import { GetProducts } from '../../test/tasks/GetProducts';

interface ProductsResponse {
  products: Product[];
  total: number;
}

When('{actor} consulta todos los productos', async (actor: Actor) => {
  await actor.attemptsTo(GetProducts.all());
});

When('{actor} consulta los productos de la categoría {string}', async (
  actor: Actor,
  category: string,
) => {
  await actor.attemptsTo(GetProducts.inCategory(category));
});

Then('la respuesta HTTP tiene estado {int}', async (status: number) => {
  await actorInTheSpotlight().attemptsTo(
    Ensure.that(LastResponse.status(), equals(status)),
  );
});

Then('la respuesta contiene {int} productos', async (total: number) => {
  await actorInTheSpotlight().attemptsTo(
    Ensure.that(LastResponse.body<ProductsResponse>().total, equals(total)),
  );
});

Then('el primer producto se llama {string}', async (name: string) => {
  await actorInTheSpotlight().attemptsTo(
    Ensure.that(LastResponse.body<ProductsResponse>().products[0].name, equals(name)),
  );
});

