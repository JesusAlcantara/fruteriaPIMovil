import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { RestServiceService } from '../services/rest-service.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.page.html',
  styleUrls: ['./loginpage.page.scss'],
})
export class LoginpagePage implements OnInit {

  loginusuario: FormGroup;
  token: any;
  datos: any[];
  loading: any;

  constructor(public fb: FormBuilder, 
              private restService: RestServiceService,
              private alertCtrl: AlertController, 
              public navCtrl: NavController) { 
    this.loginusuario = this.createForm();
  }

  public createForm() : FormGroup{
    let usuario = this.fb.group({
      email: new FormControl('', [Validators.required,  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    },
    );
    
    return usuario;
  }

  get email() {
    return this.loginusuario.get('email');
  }
  get password() {
    return this.loginusuario.get('password');
  }

  public errorMessages = {
    email: [
      { type: 'required', message: 'Email obligatorio' },
      { type: 'pattern', message: 'Por favor introduzca un email correcto' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' }
    ],
  };

  ngOnInit() {
  }
  

  async guardarDatos(){
      this.restService.login(this.loginusuario)
      .then((result)=>{
        console.log(result);
        this.presentAlert();
        this.tipoUsuario();
      }, (err)=>{

      })
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Inicio de sesión correcto',
      message: 'Gracias por iniciar sesión.',
      buttons: ['OK']
    });

    await alert.present();
  }
  
  async tipoUsuario(){
    if(this.restService.rol==='ROL_CLIENTE'){
        //this.showLoader();
        this.navCtrl.navigateForward('inicio-cliente');
    }
  }
}
