import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './core/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/home/home.module#HomeModule',
  },
  {
    path: 'transfiere',
    loadChildren: './pages/transfiere/transfiere.module#TransfiereModule',
  },
  {
    path: 'register',
    loadChildren: './pages/register/register.module#RegisterModule',
  },
  {
    path: 'loading',
    loadChildren: './pages/loading/loading.module#LoadingModule',
  },
  {
    path: 'actividad',
    loadChildren: './pages/actividad/actividad.module#ActividadModule',
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
