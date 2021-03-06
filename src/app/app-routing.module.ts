import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'loginpage',
    loadChildren: () => import('./loginpage/loginpage.module').then( m => m.LoginpagePageModule)
  },
  {
    path: 'inicio-cliente',
    loadChildren: () => import('./inicio-cliente/inicio-cliente.module').then( m => m.InicioClientePageModule)
  },
  {
    path: 'informacion-tienda',
    loadChildren: () => import('./informacion-tienda/informacion-tienda.module').then( m => m.InformacionTiendaPageModule)
  },
  {
    path: 'carrito-compra',
    loadChildren: () => import('./carrito-compra/carrito-compra.module').then( m => m.CarritoCompraPageModule)
  },
  {
    path: 'ver-pedidos',
    loadChildren: () => import('./ver-pedidos/ver-pedidos.module').then( m => m.VerPedidosPageModule)
  },
  {
    path: 'localizacion',
    loadChildren: () => import('./localizacion/localizacion.module').then( m => m.LocalizacionPageModule)
  },
  {
    path: 'registrar-usuario',
    loadChildren: () => import('./registrar-usuario/registrar-usuario.module').then( m => m.RegistrarUsuarioPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
