import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {


  product: Product[] = [];
  pSubscription: Subscription | undefined;

  constructor(private productService: ProductService,
              private http: HttpClient,
              private router: Router) {
    this.pSubscription = this.productService.getProducts().subscribe({
      next: (product) => {
        this.product = product;
        console.log(product)
      },
      error: (error) => {
        console.error('Error fetching product:', error);
      }
    });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(
      () => {
        console.log('Product deleted successfully');
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  gotToEdit(id: any) {
    this.router.navigate(['/editproduct', id]);
}
}
