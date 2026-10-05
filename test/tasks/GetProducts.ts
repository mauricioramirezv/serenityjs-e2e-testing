import { Task } from '@serenity-js/core';
import { GetRequest, Send } from '@serenity-js/rest';

export const GetProducts = {
  all: () => Task.where('#actor consulta todos los productos mediante la API',
    Send.a(GetRequest.to('/api/products')),
  ),
  inCategory: (category: string) => Task.where(`#actor consulta productos de ${ category } mediante la API`,
    Send.a(GetRequest.to(`/api/products?category=${ encodeURIComponent(category) }`)),
  ),
};

