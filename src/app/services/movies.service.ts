import {Inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {MOVIE_DATABASE, MovieDatabase} from "../core/movie-database.interface";
import {Observable, ReplaySubject} from "rxjs";
import {Movie} from "../models/movie.model";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private movies$ : WritableSignal<Movie[]>= signal<Movie[]>([]);
  constructor(@Inject(MOVIE_DATABASE) private movieDatabase : MovieDatabase) {
    this.movieDatabase.getMovies()
      .subscribe(movies => {
        this.movies$.set(movies)
      });

  }

  add(movie : Movie) : void {
    this.movies$.set([movie, ...this.movies()]);
  }

  get movies() : Signal<Movie[]> {
    return this.movies$.asReadonly();
  }

}
