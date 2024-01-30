import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent {

constructor(private product: ProductService, private http: HttpClient) {

}
addProduct = new FormGroup({
  name: new FormControl(''),
  description: new FormControl(''),
  qte: new FormControl(''),
})
saveProduct(): void {
  this.product.saveProduct(this.addProduct.value);
}
}

