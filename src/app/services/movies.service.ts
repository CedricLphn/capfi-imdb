import {Inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {MOVIE_DATABASE, MovieDatabase, SortColumn, SortType} from "../core/movie-database.interface";
import {delay, Observable, ReplaySubject} from "rxjs";
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

  search(terms : string) {
    this.movieDatabase.getMovies(terms)
      .subscribe((movies : Movie[]) => this.movies$.set(movies));
  }

  add(movie : Movie) : void {
    this.movies$.set([movie, ...this.movies()]);
  }

  get movies() : Signal<Movie[]> {
    return this.movies$.asReadonly();
  }

  sort(value: SortInput) {
    this.movieDatabase.getMovies('', (<any>SortColumn)[value.column], (<any>SortType)[value.type])
      .subscribe(movies => this.movies$.set(movies));
  }
}

export interface SortInput {
  column: string
  type: string
}
