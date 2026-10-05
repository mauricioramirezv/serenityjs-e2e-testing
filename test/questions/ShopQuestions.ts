import { Text } from '@serenity-js/web';

import { Catalog } from '../ui/Catalog';
import { LoginForm } from '../ui/LoginForm';

export const ShopQuestions = {
  authenticationMessage: () => Text.of(LoginForm.message()),
  visibleProductNames: () => Text.ofAll(Catalog.visibleProductNames()),
  cartCount: () => Text.of(Catalog.cartCount()),
};

