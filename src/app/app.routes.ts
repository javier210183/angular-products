import { Routes } from '@angular/router';
import { ProductsPageComponent } from './products-page/products-page.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductFormComponent } from './product-form/product-form.component';

export const routes: Routes = [
    { path: 'products', component: ProductsPageComponent },
    { path: 'products/add', component: ProductFormComponent },
    { path: 'products/:id', component:  ProductDetailComponent},
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    // Aquí podríamos cargar un página de error 404 por ejemplo
    { path: '**', redirectTo: '/products' }
  ];
