import { AddressInfo } from 'node:net';
import { createServer, Server } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export interface Product {
  id: number;
  name: string;
  category: 'books' | 'courses';
}

const products: Product[] = [
  { id: 1, name: 'Clean Code', category: 'books' },
  { id: 2, name: 'Testing TypeScript', category: 'books' },
  { id: 3, name: 'Curso Screenplay', category: 'courses' },
];

let server: Server | undefined;
let baseUrl = '';

export async function startDemoServer(): Promise<string> {
  const html = await readFile(join(__dirname, '../../demo_app/index.html'), 'utf8');

  server = createServer((request, response) => {
    const url = new URL(request.url ?? '/', 'http://localhost');

    if (request.method === 'GET' && url.pathname === '/api/products') {
      const category = url.searchParams.get('category');
      const result = category
        ? products.filter(product => product.category === category)
        : products;
      response.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify({ products: result, total: result.length }));
      return;
    }

    if (request.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
      response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      response.end(html);
      return;
    }

    response.writeHead(404, { 'content-type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ error: 'Not found' }));
  });

  await new Promise<void>(resolve => server?.listen(0, '127.0.0.1', resolve));
  const address = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${address.port}`;
  return baseUrl;
}

export function demoBaseUrl(): string {
  if (!baseUrl) throw new Error('El servidor de demostración no está iniciado');
  return baseUrl;
}

export async function stopDemoServer(): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    if (!server) return resolve();
    server.close(error => error ? reject(error) : resolve());
  });
  server = undefined;
  baseUrl = '';
}

