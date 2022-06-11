import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { RestServiceService } from '../services/rest-service.service';

@Component({
  selector: 'app-informacion-tienda',
  templateUrl: './informacion-tienda.page.html',
  styleUrls: ['./informacion-tienda.page.scss'],
})
export class InformacionTiendaPage implements OnInit {

  nombreUsuario: string = this.restService.nombreUsuario;

  constructor(private menu: MenuController, 
              private restService: RestServiceService,
              private navCtrl: NavController) { }

  ngOnInit() {
  }

  toggleMenu() {
    this.menu.toggle()
  }

  logout() {
    localStorage.removeItem('token')
    this.navCtrl.navigateForward(['loginpage'])
  }

}
