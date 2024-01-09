import {Component, effect, OnDestroy, OnInit, Signal, signal} from '@angular/core';
import {CardComponent} from "./card/card.component";
import { MoviesService } from '../../services/movies.service';
import {Movie} from "../../models/movie.model";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {CreateMovieComponent} from "../create-movie/create-movie.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent,
    CreateMovieComponent,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  private subscriptions: Subscription[] = [];
  loading = signal(true);
  createMovie = false;

  constructor(private moviesService: MoviesService,
              private route: ActivatedRoute) {
    effect(() => {
      this.movies = this.moviesService.movies()
    });
  }

  ngOnInit() {
      this.subscriptions.push(
        this.route.params.subscribe(params => {
          this.createMovie = params['action'] == 'create';
        }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());



  }



}
