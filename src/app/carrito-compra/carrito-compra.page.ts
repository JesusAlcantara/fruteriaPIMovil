import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../services/rest-service.service';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.page.html',
  styleUrls: ['./carrito-compra.page.scss'],
})
export class CarritoCompraPage implements OnInit {

  productosCarrito: any[] = [];
  precioTotal: number;

  constructor(private restService: RestServiceService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.productosCarrito = this.restService.carrito
  }

  vaciarCarrito() {
    this.productosCarrito = []
    this.restService.carrito = []
    this.restService.precio = 0
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
    console.log(formateo)
    console.log(this.restService.idUsuario)
    this.restService.confirmarPedido(formateo, this.restService.idUsuario)
  }

}
