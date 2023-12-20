import { Component, Input, OnInit, inject, numberAttribute } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from "../star-rating/star-rating.component";
import { Router } from '@angular/router';

@Component({
    selector: 'product-detail',
    standalone: true,
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.css',
    imports: [CommonModule, StarRatingComponent]
})
export class ProductDetailComponent implements OnInit {
  #router = inject(Router);
  #productsService = inject(ProductsService);
  product?: Product;
  @Input({ transform: numberAttribute })
  set id(id: number) {
    this.#productsService .getProduct(id).subscribe((p) => (this.product = p));
  }
  
  goBack() {
    this.#router.navigate(['/products']);
  }
  
  changeRating(rating: number) {
    
    const oldRating = this.product!.rating; // Por si acaso
    this.product!.rating = rating;
    this.#productsService
      .changeRating(this.product!.id!, rating)
      .subscribe({error: (error) => {
        // Mostrar mensaje de error
        this.product!.rating = oldRating; // Restauramos puntuación
      }});
      
  }
  ngOnInit(): void {
    this.#productsService
      .getProduct(this.id)
      .subscribe((p) => (this.product = p));
  }
  
}