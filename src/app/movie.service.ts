import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Movie } from './movie.module';
import 'rxjs/RX';
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies: Movie [] = [];
  moviesChanged = new Subject<Movie[]>();
  urlMovies = [];
  counter = 0 ;
  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
      const mObject = this.http.get('http://www.omdbapi.com/?i=tt0499549&apikey=3d71d4bb');
      const mObject1 = this.http.get('http://www.omdbapi.com/?i=tt0120338&apikey=3d71d4bb');
      const mObject2 = this.http.get('http://www.omdbapi.com/?i=tt0110357&apikey=3d71d4bb');
      const mObject3 = this.http.get('http://www.omdbapi.com/?i=tt0068646&apikey=3d71d4bb');
      const mObject4 = this.http.get('http://www.omdbapi.com/?i=tt0114709&apikey=3d71d4bb');
      const mObject5 = this.http.get('http://www.omdbapi.com/?i=tt0468569&apikey=3d71d4bb');
      const mObject6 = this.http.get('http://www.omdbapi.com/?i=tt0332280&apikey=3d71d4bb');
      const mObject7 = this.http.get('http://www.omdbapi.com/?i=tt0126029&apikey=3d71d4bb');

      return Observable.forkJoin([mObject, mObject1, mObject2, mObject3, mObject4, mObject5, mObject6, mObject7])
      .map(responses => {
        return [].concat(...responses);
      });
  }
  getMovie(index: number) {
    console.log(this.movies[0]);
    return this.movies[index];
  }
  AddMovie(id: number, Title: string, Year: string, Runtime: string, Genre: string, Director: string, Poster: string){
    const movie: Movie = {id: id, Title: Title, Year: Year, Runtime: Runtime, Genre: Genre, Director: Director, Poster: Poster}
    this.movies.push(movie);
    this.moviesChanged.next(this.movies.slice());
    this.urlMovies.push(1);
   }
  updateMovie(index: number, newMovie: Movie) {
    this.movies[index] = newMovie;
    this.moviesChanged.next(this.movies.slice());
  }
  genId() {
     if (this.urlMovies.length === 0) {
       return 6;
     }
     return this.urlMovies.length;
   }
  deleteMovie(index: number) {
    this.movies.splice(index, 1);
    for(const movie of this.movies){
        movie.id = this.counter;
        this.counter += 1;
      }
    this.counter = 0;
    this.moviesChanged.next(this.movies.slice());
    this.urlMovies.splice(this.urlMovies.length - 1);
   }
}
