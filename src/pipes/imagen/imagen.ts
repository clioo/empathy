import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the ImagenPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  constructor(private http:HttpClient){

  }
  transform(value: string, files:any[]) {
    for (let i = 0; i < files.length; i++) {
      const element = files[i];
      if (element._id == value) {
        console.log('ay mi diso ')
        return 'https://infinite-dawn-60230.herokuapp.com/'+element.Direccion;
      }
    }
      

    
  }
}
