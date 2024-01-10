import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {MoviesService} from "../../services/movies.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private movieService: MoviesService) {
  }
  search($event: any) {
    this.movieService.search($event.target.value);
  }
}
