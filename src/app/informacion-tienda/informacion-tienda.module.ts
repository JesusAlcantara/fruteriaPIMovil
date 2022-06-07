import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformacionTiendaPageRoutingModule } from './informacion-tienda-routing.module';

import { InformacionTiendaPage } from './informacion-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InformacionTiendaPageRoutingModule
  ],
  declarations: [InformacionTiendaPage]
})
export class InformacionTiendaPageModule {}
