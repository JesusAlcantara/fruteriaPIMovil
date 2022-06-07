import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InformacionTiendaPage } from './informacion-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: InformacionTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InformacionTiendaPageRoutingModule {}
