import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {MOVIE_DATABASE} from "./core/movie-database.interface";
import {DummyMovieDatabaseService} from "./injections/dummy-movie-database.service";
import {provideHttpClient} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),
    { provide: MOVIE_DATABASE, useClass: DummyMovieDatabaseService }
  ]
};
