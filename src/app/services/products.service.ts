import { Injectable, inject } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ProductsResponse, SingleProductResponse } from '../interfaces/responses';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  #productsUrl = 'products';
  #http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.#http
      .get<ProductsResponse>(`${this.#productsUrl}`)
      .pipe(map((resp) => resp.products));
  }
  getProduct(id: number): Observable<Product> {
    return this.#http
      .get<SingleProductResponse>(`${this.#productsUrl}/${id}`)
      .pipe(map((resp) => resp.product));
  }
  changeRating(idProduct: number, rating: number): Observable<void> {
    return this.#http.put<void>(`${this.#productsUrl}/${idProduct}/rating`, {
      rating: rating,
    });
}

}
