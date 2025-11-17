import { Routes } from '@angular/router';

// Páginas sem header
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';

// Layout
import { MainLayoutComponent } from './shared/main-layout/main-layout';

// Páginas internas
import { MenuComponent } from './pages/menu/menu';
import { SelectExerciciosComponent } from './pages/treinos/select-exercicios/select-exercicios';
import { ListTreinosComponent } from './pages/treinos/list-treinos/list-treinos';
import { EditTreinoComponent } from './pages/treinos/edit-treinos/edit-treinos';

export const routes: Routes = [

  // Rotas públicas SEM HEADER
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Tudo que é pós-login fica dentro do layout
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      { path: 'menu', component: MenuComponent },
      { path: 'treinos/selecionar', component: SelectExerciciosComponent },
      { path: 'treinos/listar', component: ListTreinosComponent},
      { path: 'treinos/editar/:id', component: EditTreinoComponent }
    ]
  },

  // Wildcard (sem interferir nas outras)
  { path: '**', redirectTo: 'login' }
];
