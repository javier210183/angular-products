import { Component, Input, inject } from '@angular/core';
import { Product } from '../interfaces/product';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { ProductsService } from '../services/products.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'product-item',
    standalone: true,
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.css'],
    imports: [CommonModule, StarRatingComponent, RouterLink]
})
export class ProductItemComponent {
  @Input({required: true}) product!: Product; // required: true -> Obligatorio
  @Input() showImage: boolean = true; // Valor por defecto (opcional)
  #productsService = inject(ProductsService);

  changeRating(rating: number) {
    const oldRating = this.product.rating; // Por si acaso
    this.product.rating = rating;
    this.#productsService
      .changeRating(this.product.id!, rating)
      .subscribe({
        error: (error) => {
        // Mostrar mensaje de error
        this.product.rating = oldRating; // Restauramos puntuación
      }});
  }
}