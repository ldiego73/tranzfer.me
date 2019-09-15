import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActividadPageComponent } from './actividad.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadRoutingModule {}
