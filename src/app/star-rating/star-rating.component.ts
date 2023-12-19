import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
 
  @Output() ratingChanged = new EventEmitter<number>();
  @Input()
  set rating(rating: number) {
    this.#rating = rating;
    this.auxRating = rating;
  }

  #rating = 0;
  auxRating = 0;

  restoreRating() {
    this.auxRating = this.#rating;
  }

  changeRating(rating: number) {
    this.ratingChanged.emit(rating);
  }
 
}