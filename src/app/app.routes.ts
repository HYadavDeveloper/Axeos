import { Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { SwitchesComponent } from './switches/switches.component';
import { StreamEventsComponent } from './stream-events/stream-events.component';
import { AuthGuard } from './guards/tokenGuard.service';

export const routes: Routes = [
  {
    path: '',
    component: UserLoginComponent,
  },

  {
    path: 'switch',
    component: SwitchesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'stream',
    component: StreamEventsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
