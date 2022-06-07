import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(array: any, texto: string): any {
    if(texto === '') {
      return array;
    }

    return array.filter( item => {
      return item.nombre.toLowerCase().includes( texto.toLowerCase() )
    })
  }

}
