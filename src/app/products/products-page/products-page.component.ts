import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../interfaces/product';
import { FormsModule } from '@angular/forms';
import { ProductFilterPipe } from '../pipes/product-filter.pipe';
import { ProductItemComponent } from '../product-item/product-item.component';
import { ProductsService } from '../services/products.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'products-page',
  standalone: true,
  imports: [CommonModule,FormsModule,ProductFilterPipe,ProductItemComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent {
  title = "Mi lista de productos";
  headers = {description: 'Producto',
   price: 'Precio',
    available: 'Disponible',
     imagen: 'imagen',
     rating: 'Puntuacion',
    };

  products: Product[] = [];
  #productsService = inject(ProductsService);
  #titleService = inject(Title);
  ngOnInit(): void {
    this.#productsService
      .getProducts()
      .subscribe((products) => (this.products = products));
      this.#titleService.setTitle("Productos | Angular Products Nuevos");
  }
  showImage = true;
  toggleImage() {
    this.showImage = !this.showImage;
  }
  newProduct!: Product;
  fileName = '';
  search = '';
  

  constructor() {
    this.resetProduct();
  }

  

  changeImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.newProduct.imageUrl = reader.result as string;
    });
  }

  addProduct() {
    this.newProduct.id = Math.max(...this.products.map(p => p.id!)) + 1;
    this.products = [...this.products, this.newProduct];
    this.fileName = '';
    this.resetProduct();
  }

  private resetProduct() {
    this.newProduct = {
      id: 0,
      description: '',
      available: '',
      imageUrl: '',
      rating: 1,
      price: 0
    };
  }
}