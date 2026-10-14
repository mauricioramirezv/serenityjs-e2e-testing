import { Then } from '@cucumber/cucumber';
import { Ensure, equals, not } from '@serenity-js/assertions';
import { Actor } from '@serenity-js/core';
import { isVisible } from '@serenity-js/web';

import { ShopQuestions } from '../../test/questions/ShopQuestions';
import { Catalog } from '../../test/ui/Catalog';
import { LoginForm } from '../../test/ui/LoginForm';

Then('{pronoun} observa el catálogo {string}', async (actor: Actor, state: string) => {
  if (state !== 'visible' && state !== 'oculto') {
    throw new Error(`Estado del catálogo no reconocido: ${state}. Use visible u oculto.`);
  }
  await actor.attemptsTo(
    Ensure.that(Catalog.root(), state === 'visible' ? isVisible() : not(isVisible())),
  );
});

Then('{pronoun} no observa productos en el catálogo', async (actor: Actor) => {
  await actor.attemptsTo(
    Ensure.that(ShopQuestions.visibleProductNames(), equals([] as string[])),
  );
});

Then('{pronoun} observa el elemento {string}', async (actor: Actor, name: string) => {
  const elements = {
    usuario: LoginForm.username,
    contraseña: LoginForm.password,
    'botón de ingreso': LoginForm.submit,
  };
  if (!Object.prototype.hasOwnProperty.call(elements, name)) {
    throw new Error(`Elemento no reconocido: ${name}. Use usuario, contraseña o botón de ingreso.`);
  }
  const element = elements[name as keyof typeof elements];
  await actor.attemptsTo(Ensure.that(element(), isVisible()));
});
