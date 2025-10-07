import { Routes } from '@angular/router';

import { LoginForm } from './IAM/presentation/views/login-form/login-form';
import { RegisterForm } from './IAM/presentation/views/register-form/register-form';
import { IamLayout } from './IAM/presentation/components/iam-layout/iam-layout';


const baseTitle = 'Safework';

export const routes: Routes = [
  {
    path: '',
    component: IamLayout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginForm, title: `${baseTitle} - Home` },
      { path: 'register', component: RegisterForm, title: `${baseTitle} - Register` }
    ]
  },
];
