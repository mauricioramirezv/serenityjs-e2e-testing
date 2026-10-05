import { Masked, Task } from '@serenity-js/core';
import { Click, Enter } from '@serenity-js/web';

import { LoginForm } from '../ui/LoginForm';

export const Authenticate = {
  withCredentials: (username: string, password: string) => Task.where(
    `#actor inicia sesión como "${ username }"`,
    Enter.theValue(username).into(LoginForm.username()),
    Enter.theValue(Masked.valueOf(password)).into(LoginForm.password()),
    Click.on(LoginForm.submit()),
  ),
};

