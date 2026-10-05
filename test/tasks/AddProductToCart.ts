import { Task } from '@serenity-js/core';
import { Click } from '@serenity-js/web';

import { Catalog } from '../ui/Catalog';

export const AddProductToCart = {
  named: (productName: string) => Task.where(`#actor agrega "${ productName }" al carrito`,
    Click.on(Catalog.addButtonFor(productName)),
  ),
};

