import { Injectable } from '@angular/core';
import {Jsonp} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class PeliculasService {

  private apikey:string = 'c721cc743c6e82815ef2f5e89925c214';
  private urlMoviedb:string = 'https://api.themoviedb.org/3/';

  peliculas :any[] = [];

  constructor(
    private jsonp:Jsonp
  ) { }

  getCartelera(){

    let desde = new Date();
    let hasta = new Date();
    hasta.setDate(hasta.getDate()+7);
    let desdeStr = `${desde.getFullYear()}-${desde.getMonth() + 1}-${desde.getDay()}`;//${desdeStr}
    let hastaStr = `${hasta.getFullYear()}-${hasta.getMonth() + 1}-${hasta.getDay()}`;//${hastaStr}

    let url = `${this.urlMoviedb}discover/movie?primary_release_date.gte=2020-09-01&primary_release_date.lte=2020-09-21&api_key=${this.apikey}&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get(url).pipe( map(res=>res.json().results));
  }

  getPopulares(){
    
    let url = `${this.urlMoviedb}discover/movie?api_key=${this.apikey}&language=es&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&callback=JSONP_CALLBACK`;

    return this.jsonp.get(url).pipe( map(res=>res.json().results));
  }

  
  getPopularesNinos(){

    let url = `${this.urlMoviedb}discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${this.apikey}&language=es&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&callback=JSONP_CALLBACK`;

    return this.jsonp.get(url).pipe( map(res=>res.json().results));
  }

  buscarPelicula( texto:string ){

    let url = `${ this.urlMoviedb }search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    
    return this.jsonp.get( url )
                .pipe(map( res=> {this.peliculas = res.json().results; return res.json().results;}));
  }

  getPelicula(id:string){
    
    let url = `${this.urlMoviedb}movie/${id}?api_key=${this.apikey}&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get(url).pipe(map(res=>res.json()));
  }

}
