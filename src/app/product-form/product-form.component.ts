import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../interfaces/product';

@Component({
  imports: [CommonModule, FormsModule], // No olvides FormsModule para usar ngModel
  selector: 'product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  @Output() add = new EventEmitter<Product>();

  newProduct!: Product;
  fileName!: string;

  constructor() {
    this.resetProduct();
  }

  changeImage(event: Event) {
    // Mismo código
  }

  addProduct() {
    this.add.emit(this.newProduct); // Enviamos el producto al padre
    this.resetProduct();
  }

  private resetProduct() {
    this.newProduct = {
      description: '',
      available: '',
      imageUrl: '',
      rating: 0,
      price: 0
    };
    this.fileName = '';
  }
}
