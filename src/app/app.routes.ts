import { Routes } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {NavbarComponent} from "./navbar/navbar.component";
import {HerosComponent} from "./landing/heros/heros.component";
import {TypeComponent} from "./type/type.component";


export const routes: Routes = [
  {path: 'login',
    component: LoginComponent
  },
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full' },

  { path: 'navbar',
    component: NavbarComponent },

  { path: 'home', component: HerosComponent },

  {path: 'type', component:TypeComponent}
];
