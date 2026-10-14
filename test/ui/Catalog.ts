import { By, PageElement, PageElements } from '@serenity-js/web';

export const Catalog = {
  root: () => PageElement.located(By.css('#catalog')).describedAs('catálogo de productos'),
  search: () => PageElement.located(By.css('#search')).describedAs('campo de búsqueda'),
  category: () => PageElement.located(By.css('#category')).describedAs('selector de categoría'),
  visibleProductNames: () => PageElements.located(By.css('.product:not([hidden]) h3')).describedAs('productos visibles'),
  cartCount: () => PageElement.located(By.css('#cart-count')).describedAs('cantidad del carrito'),
  addButtonFor: (name: string) => PageElement.located(By.css(`button[data-add="${ name }"]`)).describedAs(`botón Agregar de "${ name }"`),
};

