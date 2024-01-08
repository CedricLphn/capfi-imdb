import {ObjectMapper} from "./object.mapper";
import {MovieDatabaseModel} from "../models/movie-database.model";
import {Movie} from "../models/movie.model";

export class MovieDatabaseModelMapper implements ObjectMapper<MovieDatabaseModel, Movie>
{
  private static instance: MovieDatabaseModelMapper;
  from(input: MovieDatabaseModel): Movie {
    return {
      tconst: input.tconst,
      titleType: input.titleType,
      primaryTitle: input.primaryTitle,
      originalTitle: input.originalTitle,
      isAdult: input.isAdult === '1',
      startYear: input.startYear,
      runtimeMinutes: input.runtimeMinutes,
      genres: input.genres.length > 0 ? input.genres.split(',') : [],
    }
  }
  to(input: Movie): MovieDatabaseModel {
    throw new Error("Method not implemented.");
  }

  static of() : MovieDatabaseModelMapper {
    if (!MovieDatabaseModelMapper.instance) {
      MovieDatabaseModelMapper.instance = new MovieDatabaseModelMapper();
    }
    return MovieDatabaseModelMapper.instance;
  }


}
