import { By, PageElement } from '@serenity-js/web';

export const LoginForm = {
  username: () => PageElement.located(By.css('#username')).describedAs('campo de usuario'),
  password: () => PageElement.located(By.css('#password')).describedAs('campo de contraseña'),
  submit: () => PageElement.located(By.css('#login-button')).describedAs('botón Ingresar'),
  message: () => PageElement.located(By.css('#login-message')).describedAs('mensaje de autenticación'),
};

