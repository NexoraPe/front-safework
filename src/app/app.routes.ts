import { Routes } from '@angular/router';

import { LoginForm } from './IAM/presentation/views/login-form/login-form';
import { RegisterForm } from './IAM/presentation/views/register-form/register-form';
import { IamLayout } from './IAM/presentation/components/iam-layout/iam-layout';

import { MainLayout} from './shared/presentation/components/main-layout/main-layout';

import { ProfileForm } from './IAM/presentation/views/profile-form/profile-form';
import { IncidentsList  } from './incidents/presentations/views/incidents-list/incidents-list';
import { Notifications  } from './notifications/presentation/views/notifications/notifications';
import { AssignmentsBoard  } from './assignments/presentation/views/assignments-board/assignments-board';
import { Analytics  } from './analytics/presentation/views/analytics/analytics';

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
  {
    path: 'app',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: ProfileForm, title: `${baseTitle} - Profile` },
      { path: 'incidents', component: IncidentsList, title: `${baseTitle} - Incidents` },
      { path: 'notifications', component: Notifications, title: `${baseTitle} - Notifications` },
      { path: 'assignments', component: AssignmentsBoard, title: `${baseTitle} - Assignments` },
      { path: 'analytics', component: Analytics, title: `${baseTitle} - Analytics` }
    ]
  }
];
