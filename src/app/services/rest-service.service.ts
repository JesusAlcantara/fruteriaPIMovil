import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private Http:HttpClient) { }

  async login(loginUsuario: any){
    return new Promise(resolve => {
      this.Http.post<any>(this.apiUrl+'/login', 
      {email: loginUsuario.value.email,
        password: loginUsuario.value.password
       })
       .subscribe(data => {
        this.token = data.data.token,
        this.rol= data.data.rol,
        console.log(data),
        this.idUsuario = data.data.id,
        this.nombreUsuario = data.data.nombre
        resolve(data);
       }, err=>{
         console.log('Error '+err);
       })
    });
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

}
