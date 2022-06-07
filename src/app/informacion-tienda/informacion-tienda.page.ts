import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { RestServiceService } from '../services/rest-service.service';

@Component({
  selector: 'app-informacion-tienda',
  templateUrl: './informacion-tienda.page.html',
  styleUrls: ['./informacion-tienda.page.scss'],
})
export class InformacionTiendaPage implements OnInit {

  nombreUsuario: string = this.restService.nombreUsuario;

  constructor(private menu: MenuController, 
              private restService: RestServiceService) { }

  ngOnInit() {
  }

  toggleMenu() {
    this.menu.toggle()
  }

}
