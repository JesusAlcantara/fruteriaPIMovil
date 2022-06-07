import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { RestServiceService } from '../services/rest-service.service';

@Component({
  selector: 'app-inicio-cliente',
  templateUrl: './inicio-cliente.page.html',
  styleUrls: ['./inicio-cliente.page.scss'],
})
export class InicioClientePage implements OnInit {

  productos: any[];
  textoBuscar: string = '';
  nombreUsuario: string = this.restService.nombreUsuario;

  constructor(private restService: RestServiceService, private menu: MenuController) { }

  toggleMenu() {
    this.menu.toggle()
  }

  ngOnInit() {
    this.showLoader()
  }

  async showLoader(){

    this.nombreUsuario = this.restService.nombreUsuario;

    this.restService.obtenerProductos().then( (data)=>{
      this.productos=this.restService.productos;
    }).catch( (error) => {
      console.log(error);
  });
  }

  anyadirProducto() {}

  buscar(event){
    this.textoBuscar = event.detail.value;
  }

}
