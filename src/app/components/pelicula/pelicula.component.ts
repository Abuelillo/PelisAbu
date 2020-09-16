import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styles: [
  ]
})
export class PeliculaComponent implements OnInit {
  
  pelicula:any;
  regresarA:string ="";
  busqueda:string ="";

  constructor(public _ps:PeliculasService,public route:ActivatedRoute) { 

    this.route.params.subscribe(parametros => {   
      this.regresarA = parametros.pag;  
      if (parametros['busqueda']) {
        this.busqueda = parametros['busqueda'];
      }
      this._ps.getPelicula(parametros['id']).subscribe( peli => {
        console.log(peli);
        this.pelicula = peli;
      })
      
    });
    
  }

  ngOnInit(): void {
  }

}
