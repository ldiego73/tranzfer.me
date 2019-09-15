import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransferirPageComponent } from './transfiere.page';

const routes: Routes = [
  {
    path: '',
    component: TransferirPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransfiereRoutingModule {}
