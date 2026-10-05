import { Task } from '@serenity-js/core';
import { Clear, Enter } from '@serenity-js/web';

import { Catalog } from '../ui/Catalog';

export const SearchCatalog = {
  for: (term: string) => Task.where(`#actor busca "${ term }" en el catálogo`,
    Clear.theValueOf(Catalog.search()),
    Enter.theValue(term).into(Catalog.search()),
  ),
};

