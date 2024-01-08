import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardComponent} from "./card/card.component";
import { MoviesService } from '../../services/movies.service';
import {Movie} from "../../models/movie.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  movies: Movie[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private moviesService: MoviesService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.moviesService.movies.subscribe(movies => this.movies = movies)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }



}
