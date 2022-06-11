import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  apiUrl = 'http://localhost:8090/api'
  token: any;
  idUsuario:any;
  rol: any;
  productos: any[];
  nombreUsuario: string = '';
  productoDevuelto: any;
  carrito: any[] = [];
  cantidadProducto: number;
  precio: number;

  constructor(private Http:HttpClient,
              private alertCtrl: AlertController) { }

  async login(loginUsuario: any){

    let header = {
      'Content-Type': 'application/x-www-form-urlencoded',
      //Accept: 'application/json'
    }

    let options = {
      headers: header
    }

    let body = ('email=' + loginUsuario.value.email + '&password=' + loginUsuario.value.password)

    return new Promise(resolve => {
      this.Http.post<any>(this.apiUrl+'/login', body, options)
       .subscribe(data => {
          this.rol = data.rol,
          console.log(data),
          console.log('id: ', data.id)
          this.idUsuario = data.id,
          this.nombreUsuario = data.nombre
          sessionStorage.setItem('token', data.token)
          resolve(data);
       }, err=>{
         this.errorAlert()
       })
    });
  }

  async errorAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Error al introducir los datos',
      message: 'Regístrese o introduzca los datos correctos.',
      buttons: ['OK']
    });
    
    await alert.present();
  }

  async obtenerProductos() {
    return new Promise(resolve => {
      this.Http.get<any>(this.apiUrl+'/listProductos',
      {
        headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
      }
      )
       .subscribe(data => {
        console.log('Productos')
        console.log(data);
        this.productos=data;
        resolve(data.data);
      },
      err=> {
        console.log('Error, '+err);
      })
    });
  }

  obtenerProducto(idProducto: any) {
    return new Promise(resolve => {
      this.Http.get<any>(this.apiUrl+'/listProductos/'+idProducto,
      {
        headers: new HttpHeaders().set('Authorization','Bearer '+this.token)
      }
      )
      .subscribe(data => {
        resolve(data)
        this.productoDevuelto=data;
        this.cantidadProducto = data.cantidad
        this.precio = data.precio
        this.carrito.push(this.productoDevuelto)
      },
      err=> {
        console.log('Error, '+err);
      })
    })
  }

  confirmarPedido(formateo:string, idUsuario) {
    console.log(this.idUsuario)
    let header = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }

    let options = {
      headers: header
    }

    let body = ('formateo=' + formateo + '&id=' + idUsuario)

    return new Promise(resolve => {
      this.Http.post<any>(this.apiUrl+'/pedido', body, options)
       .subscribe(data => {
         console.log('llego')
          console.log(data),
          resolve(data);
       }, err=>{
         console.log('Error ', err)
       })
    });
  }

  verPedidos(idUsuario:any) {
    this.Http.get<any>(this.apiUrl+"/verPedidos/"+idUsuario, {
      headers: new HttpHeaders().set('Content-Type','application/json')
    }).subscribe(data => {
      console.log(data)
    }, err=> {
      console.log(err)
    })
  }

  geolocalizacion() {
    const printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current position:', coordinates);
    }
  }

}
