import { Component, OnInit } from '@angular/core';
import { RestServiceService } from '../services/rest-service.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-carrito-compra',
  templateUrl: './carrito-compra.page.html',
  styleUrls: ['./carrito-compra.page.scss'],
})
export class CarritoCompraPage implements OnInit {

  productosCarrito: any[] = [];
  precioTotal: number;

  constructor(private restService: RestServiceService) { }

  ngOnInit() {
    this.productosCarrito = this.restService.carrito
  }

  vaciarCarrito() {
    this.productosCarrito = []
    this.restService.carrito = []
    this.restService.precio = 0
  }

  confirmarPedido() {
    console.log(this.productosCarrito)
  }

}
