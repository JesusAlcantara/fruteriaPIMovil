import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { RestServiceService } from '../services/rest-service.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.page.html',
  styleUrls: ['./registrar-usuario.page.scss'],
})
export class RegistrarUsuarioPage implements OnInit {

  registerUsuario: FormGroup;
  token: any;
  datos: any[];
  loading: any;

  constructor(public fb: FormBuilder, 
              private restService: RestServiceService,
              private alertCtrl: AlertController, 
              public navCtrl: NavController) { 
    this.registerUsuario = this.createForm();
  }

  public createForm() : FormGroup{
    let usuario = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      c_password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      telefono: new FormControl('', Validators.required)
    },
    );
    
    return usuario;
  }

  get nombre() {
    return this.registerUsuario.get("nombre");
  }
  get apellidos() {
    return this.registerUsuario.get('apellidos');
  }
  get email() {
    return this.registerUsuario.get('email');
  }
  get password() {
    return this.registerUsuario.get('password');
  }
  get c_password() {
    return this.registerUsuario.get('c_password');
  }
  get telefono() {
    return this.registerUsuario.get('telefono');
  }
  public errorMessages = {
    nombre: [
      { type: 'required', message: 'Nombre obligatorio' },
    ],
    apellidos: [
      { type: 'required', message: 'Apellidos obligatorio' },
    ],
    email: [
      { type: 'required', message: 'Email obligatorio' },
      { type: 'pattern', message: 'Por favor introduzca un email correcto' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' }
    ],
    c_password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 8 caracteres' },
    ],
    telefono: [
      { type: 'required', message: 'El teléfono es obligatorio' },
    ]
  };

  ngOnInit() {
  }
  

  guardar(){
    console.log(this.registerUsuario.value);
    console.log(this.registerUsuario.value.nombre);
    this.restService.register(this.registerUsuario)
    .then((result)=>{
      console.log(result);
      this.navCtrl.navigateForward('loginpage');
      this.presentAlert();
    }, (err)=>{

    })
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Registro correcto',
      message: 'Gracias por registrarte con nosotros.',
      buttons: ['OK']
    });

    await alert.present();
  }
}