import { Routes } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {NavbarComponent} from "./navbar/navbar.component";
import {HerosComponent} from "./landing/heros/heros.component";
import {TypeComponent} from "./type/type.component";
import {CardsComponent} from "./cards/cards.component";
import {CompititionComponent} from "./compitition/compitition.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {CrudUserComponent} from "./crud-user/crud-user.component";


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

  {path: 'type', component:TypeComponent},
  { path: 'cards', component: CardsComponent },

  { path: 'comptition', component: CompititionComponent },

  {path: 'user', component: CrudUserComponent},




];
