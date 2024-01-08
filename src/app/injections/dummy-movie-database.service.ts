import {MovieDatabase, SortColumn, SortType} from "../core/movie-database.interface";
import {Movie} from "../models/movie.model";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MovieDatabaseModelMapper} from "../core/movie-database-model.mapper";
import {MovieDatabaseModel} from "../models/movie-database.model";


@Injectable()
export class DummyMovieDatabaseService implements MovieDatabase {

  private movies$: Observable<Movie[]>;

  constructor(private httpClient: HttpClient) {
    this.movies$ = this.httpClient.get<MovieDatabaseModel[]>('./assets/seed.json')
      .pipe(
        map(movies => movies.map(movie => MovieDatabaseModelMapper.of().from(movie)))
      );
  }
  addMovie(movie: Movie): Promise<Movie> {
   throw new Error("Not implemented");
  }

  getMovies(search?: string,
            sortColumn: SortColumn = SortColumn.PRIMARY_TITLE,
            sortType: SortType = SortType.ASC): Observable<Movie[]> {
    return this.movies$
      .pipe(
        map(movies => {
          let filteredMovies = movies;

          if (search) {
            filteredMovies = filteredMovies.filter(movie =>
                movie.primaryTitle.toLowerCase().includes(search.toLowerCase()) ||
                movie.originalTitle.toLowerCase().includes(search.toLowerCase()) ||
                movie.startYear.toString().includes(search.toLowerCase())
            );
          }

          // Trier les films en fonction de la colonne et du type de tri
          filteredMovies.sort((a, b) => {
            const valueA  = a[sortColumn];
            const valueB = b[sortColumn];

            if (valueA < valueB) {
              return sortType === SortType.ASC ? -1 : 1;
            } else if (valueA > valueB) {
              return sortType === SortType.ASC ? 1 : -1;
            } else {
              return 0;
            }
          });

          return filteredMovies;
        }
      ));
  }


}
