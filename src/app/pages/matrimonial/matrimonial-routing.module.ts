import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatrimonialPage } from './matrimonial.page';

const routes: Routes = [
  {
    path: '',
    component: MatrimonialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MatrimonialPageRoutingModule {}
