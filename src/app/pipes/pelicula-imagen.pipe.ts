import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peliculaImagen'
})
export class PeliculaImagenPipe implements PipeTransform {

  transform(pelicula:any,poster:boolean = false): any {
   
    let url ='http://image.tmdb.org/t/p/w500';
    let urlTotal;
    
    
    if (pelicula.backdrop_path && !poster) {     
      urlTotal = url + pelicula.backdrop_path;    
       
    } else {
      if (pelicula.poster_path) {
        urlTotal = url + pelicula.poster_path;        
      } else {        
        urlTotal = "assets/img/NoImage.png";
      }
    }   
    
    return urlTotal;
  }

}
