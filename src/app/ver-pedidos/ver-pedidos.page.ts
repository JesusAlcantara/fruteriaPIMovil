import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../services/rest-service.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ver-pedidos',
  templateUrl: './ver-pedidos.page.html',
  styleUrls: ['./ver-pedidos.page.scss'],
})
export class VerPedidosPage implements OnInit {

  pedidos: any[] = []

  constructor(private restService: RestServiceService,
              private navCtrl: NavController) { }

  ngOnInit() {
  }

  ver() {
    this.restService.verPedidos(this.restService.idUsuario)
  }

  logout() {
    localStorage.removeItem('token')
    this.navCtrl.navigateForward(['loginpage'])
  }

}
