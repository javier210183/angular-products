import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products.service';
import { Router } from '@angular/router';

@Component({
  imports: [CommonModule, FormsModule], // No olvides FormsModule para usar ngModel
  selector: 'product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
[x: string]: any|string;
  @Output() add = new EventEmitter<Product>();
  @ViewChild('addForm') addForm!: NgForm;
  
  #productsService = inject(ProductsService);
  newProduct!: Product;
  fileName!: string;
  saved = false;
  #router = inject(Router);
descModel: any;

  constructor() {
    this.resetProduct();
  }
  canDeactivate() {
    return this.saved || confirm('Do you want to leave this page?. Changes can be lost');
  }
  changeImage(event: Event) {
    // Mismo código
  }

  addProduct() {
    if(this.addForm.valid) {
    this.#productsService.addProduct(this.newProduct).subscribe((p) => {
      this.saved = true;
      this.#router.navigate(['/products']);
    });
  } 
  }
  private resetProduct() {
    this.newProduct = {
      description: '',
      available: '',
      imageUrl: '',
      rating: 1,
      price: 0
    };
    this.fileName = '';
  }
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }
}
