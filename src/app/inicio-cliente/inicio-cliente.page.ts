import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, NavController, AlertController } from '@ionic/angular';
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
  carrito: any[] = [];
  precioPedido: number;

  constructor(private restService: RestServiceService, 
              private menu: MenuController, 
              private navCtrl: NavController,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController) { }

  toggleMenu() {
    this.menu.toggle()
  }

  ngOnInit() {
    this.showLoader()
  }

  irCarrito() {
    this.navCtrl.navigateForward(['carrito-compra']);
  }

  async showLoader(){

    this.nombreUsuario = this.restService.nombreUsuario;

    this.restService.obtenerProductos().then( (data)=>{
      this.productos=this.restService.productos;
    }).catch( (error) => {
      console.log(error);
  });
  }

  anyadirProducto(idProducto:any) {
    this.restService.obtenerProducto(idProducto)
    this.carrito.push(this.restService.productoDevuelto)
  }

  buscar(event){
    this.textoBuscar = event.detail.value;
  }

  async presentInput(idProducto:any){
    const input = await this.alertCtrl.create({
      header: 'Cantidad',
      subHeader: 'Cantidad del producto',
      inputs: [
        {
          name: 'txtPrecio',
          type: 'number',
          placeholder: 'Escriba la cantidad'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Confirmar Cancelar');
          }
        }, {
          text: 'Confirmar',
          handler: (info) => {
            for(let i=0; i < info.txtPrecio; i++)
              this.anyadirProducto(idProducto)
           // if(parseInt(this.sum)>=parseInt(precioMinimo) && parseInt(this.sum)<=parseInt(precioMaximo)){
             // this.guardarArticulo(id, this.sum, family_id);
              //console.log('Confirmar OK', this.sum);
              //console.log(id, family_id);
            //}
            //else
             // this.presentError()
          } 
        }
      ]
    });
    await input.present();
  }

  async presentError() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Elija una cantidad correcta.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
