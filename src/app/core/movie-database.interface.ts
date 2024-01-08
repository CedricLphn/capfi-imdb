import {Movie} from "../models/movie.model";
import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs";

export const MOVIE_DATABASE = new InjectionToken<MovieDatabase>('MovieDatabase');

export interface MovieDatabase {
  getMovies(search?: string, sortColumn?: SortColumn, sortType? : SortType): Observable<Movie[]>;
  addMovie(movie: Movie): Promise<Movie>;
}

export enum SortColumn {
  PRIMARY_TITLE = 'primaryTitle',
  ORIGINAL_TITLE = 'originalTitle',
  START_YEAR = 'startYear'
}

export enum SortType {
  ASC, DESC
}

