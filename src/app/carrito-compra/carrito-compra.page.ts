import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../services/rest-service.service';
import { MenuController, NavController, AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.page.html',
  styleUrls: ['./carrito-compra.page.scss'],
})
export class CarritoCompraPage implements OnInit {

  productosCarrito: any[] = [];
  precioTotal: number;
  fechaHoy: Date = new Date()
  pipeDate = new DatePipe('es-ES')
  todayWithPipe = null
  direccion: any = ''

  constructor(private restService: RestServiceService,
              private navCtrl: NavController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.productosCarrito = this.restService.carrito
    this.precioTotal = this.restService.precioTotal
    console.log(this.precioTotal)
  }

  vaciarCarrito() {
    this.productosCarrito = []
    this.restService.carrito = []
    this.restService.precioTotal = 0
  }

  logout() {
    window.sessionStorage.clear();
    this.navCtrl.navigateForward(['loginpage'])
  }

  confirmarPedido() {
    let formateo = '' 
    this.productosCarrito.forEach(function(producto, index, array) {
      formateo += producto.id
      if(index !== array.length - 1) {
        formateo += '.'
      }
    })
    this.todayWithPipe = this.pipeDate.transform(Date.now(), 'yyyy/MM/dd');
    this.restService.confirmarPedido(formateo, this.restService.idUsuario, this.todayWithPipe, this.precioTotal, this.direccion)
    this.restService.carrito = []
    this.navCtrl.navigateForward(['inicio-cliente'])
    this.presentAlert()
  }
  
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Pedido realizado',
      message: 'Gracias por realizar el pedido.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentPrompt() {
    let alert = await this.alertCtrl.create({
      header: 'Dirección',
      inputs: [
        {
          name: 'direccion',
          placeholder: 'Dirección...'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
          }
        },
        {
          text: 'Introduzca su dirección',
          handler: data => {
            this.direccion = data.direccion
            this.confirmarPedido()
          }
        }
      ]
    });
    alert.present()
  }
  

}
