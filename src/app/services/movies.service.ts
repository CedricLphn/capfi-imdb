import {Inject, Injectable} from '@angular/core';
import {MOVIE_DATABASE, MovieDatabase} from "../core/movie-database.interface";
import {Observable, ReplaySubject} from "rxjs";
import {Movie} from "../models/movie.model";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private movies$ : ReplaySubject<Movie[]> = new ReplaySubject<Movie[]>(0);
  constructor(@Inject(MOVIE_DATABASE) private movieDatabase : MovieDatabase) {
    this.movieDatabase.getMovies()
      .subscribe(movies => this.movies$.next(movies));
  }

  get movies() : Observable<Movie[]> {
    return this.movies$.asObservable();
  }
}
