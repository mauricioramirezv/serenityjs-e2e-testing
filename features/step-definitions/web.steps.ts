import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { Ensure, equals } from '@serenity-js/assertions';
import { Actor } from '@serenity-js/core';

import { demoBaseUrl } from '../../test/support/demoServer';
import { ShopQuestions } from '../../test/questions/ShopQuestions';
import { AddProductToCart } from '../../test/tasks/AddProductToCart';
import { Authenticate } from '../../test/tasks/Authenticate';
import { FilterCatalog } from '../../test/tasks/FilterCatalog';
import { OpenDemoApp } from '../../test/tasks/OpenDemoApp';
import { SearchCatalog } from '../../test/tasks/SearchCatalog';

Given('{actor} abre la aplicación', async (actor: Actor) => {
  await actor.attemptsTo(OpenDemoApp.at(demoBaseUrl()));
});

Given('{actor} ingresó correctamente a la aplicación', async (actor: Actor) => {
  await actor.attemptsTo(
    OpenDemoApp.at(demoBaseUrl()),
    Authenticate.withCredentials('estudiante', 'screenplay'),
  );
});

When('{pronoun} inicia sesión con usuario {string} y contraseña {string}', async (
  actor: Actor,
  username: string,
  password: string,
) => {
  await actor.attemptsTo(Authenticate.withCredentials(username, password));
});

Then('{pronoun} observa el mensaje {string}', async (actor: Actor, expected: string) => {
  await actor.attemptsTo(
    Ensure.that(ShopQuestions.authenticationMessage(), equals(expected)),
  );
});

When('{pronoun} busca {string}', async (actor: Actor, term: string) => {
  await actor.attemptsTo(SearchCatalog.for(term));
});

When('{pronoun} selecciona la categoría {string}', async (actor: Actor, category: string) => {
  await actor.attemptsTo(FilterCatalog.by(category));
});

When('{pronoun} agrega {string} al carrito', async (actor: Actor, product: string) => {
  await actor.attemptsTo(AddProductToCart.named(product));
});

Then('{pronoun} observa solamente los productos:', async (actor: Actor, table: DataTable) => {
  const expected = table.raw().flat();
  await actor.attemptsTo(
    Ensure.that(ShopQuestions.visibleProductNames(), equals(expected)),
  );
});

Then('el carrito contiene {int} producto', async (count: number) => {
  const { actorInTheSpotlight } = await import('@serenity-js/core');
  await actorInTheSpotlight().attemptsTo(
    Ensure.that(ShopQuestions.cartCount(), equals(String(count))),
  );
});

