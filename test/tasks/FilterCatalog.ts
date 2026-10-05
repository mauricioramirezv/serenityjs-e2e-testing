import { Task } from '@serenity-js/core';
import { Select } from '@serenity-js/web';

import { Catalog } from '../ui/Catalog';

export const FilterCatalog = {
  by: (category: string) => Task.where(`#actor filtra por "${ category }"`,
    Select.option(category).from(Catalog.category()),
  ),
};

