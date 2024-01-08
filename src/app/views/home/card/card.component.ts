import {Component, Input, OnInit} from '@angular/core';
import {NgIf, UpperCasePipe} from "@angular/common";
import {TwoFirstLettersPipe} from "../../../pipes/two-first-letters.pipe";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgIf,
    TwoFirstLettersPipe,
    UpperCasePipe
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent  {
  @Input({ required: true }) type: string;
  @Input({ required: true }) title: string;
  @Input({ required: true }) originalTitle: string;
  @Input({ required: true }) genres: string[];
  @Input() isAdult : boolean = false;
  @Input({ required: true }) release: number;
  @Input({ required: true }) duration: number;

}
