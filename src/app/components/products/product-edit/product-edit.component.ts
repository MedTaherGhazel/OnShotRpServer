import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit{

  product:any
  productId!: number

constructor(
  private http: HttpClient,
  private productService: ProductService,
  private route: ActivatedRoute) {
}
ngOnInit(): void {
  this.route.params.subscribe((params) => {
     this.productId = params['id']; // '+' to convert string to number
    this.getProductById(this.productId);
  });
}

  editProduct = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    qte: new FormControl(''),
  })

  getProductById(productId: number): void {
    this.productService.getProductById(productId).subscribe(
      (product) => {
        this.product = product;
      },
      (error) => {
        console.error('Error fetching product:', error);
      }
    );
  }

  updateProduct(productId :any): void {

    var inputData={
      name:this.product.name,
      description: this.product.description,
      qte: this.product.qte

    }
    console.log(inputData)
    try {
      this.productService.updateProduct(productId, inputData).subscribe();
      console.log('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  }
}
