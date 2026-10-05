import { Task } from '@serenity-js/core';
import { Navigate } from '@serenity-js/web';

export const OpenDemoApp = {
  at: (baseUrl: string) => Task.where('#actor abre la aplicación de demostración',
    Navigate.to(baseUrl),
  ),
};

