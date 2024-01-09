import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Movie} from "../../models/movie.model";
import {MoviesService} from "../../services/movies.service";

@Component({
  selector: 'app-create-movie',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './create-movie.component.html',
  styleUrl: './create-movie.component.scss'
})
export class CreateMovieComponent {
  movieForm: FormGroup = this.formBuilder.group({
    originalTitle: ['', Validators.required],
    primaryTitle: ['', Validators.required],
    year: ['2023', [Validators.required, Validators.pattern("^[0-9]*$")]]
  })

  formValidation = false;

  constructor(private formBuilder: FormBuilder,
              private movieService: MoviesService) {
  }

  submitForm() {
    this.formValidation = true;

    if(!this.movieForm.valid) {
      return;
    }

    const movie : Movie = {
      isAdult: false,
      runtimeMinutes: 0,
      titleType: "movie",
      tconst: 'manually_add',
      genres: [],
      originalTitle: this.movieForm.value.originalTitle,
      primaryTitle: this.movieForm.value.primaryTitle,
      startYear: this.movieForm.value.startYear
    }

    this.movieService.add(movie);
  }

}
