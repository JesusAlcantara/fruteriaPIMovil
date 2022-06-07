import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InicioClientePageRoutingModule } from './inicio-cliente-routing.module';

import { InicioClientePage } from './inicio-cliente.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    InicioClientePageRoutingModule
  ],
  declarations: [InicioClientePage]
})
export class InicioClientePageModule {}
