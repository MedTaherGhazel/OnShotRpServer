import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8088/products';

  constructor(private http: HttpClient) { }

  saveProduct(data: any) {
    console.log(data)
    this.http.post('http://localhost:8088/products', data).subscribe({
      next: (response) => {
        console.log(data)
        console.log('Upload successful:', response);
      },
      error: (error) => {
        console.log(data)
        console.error('Upload failed:', error);
      },
      complete: () => {
      },
    });  }

  getProducts(): Observable<any[]> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // return this.http.get<any[]>(this.apiUrl,{ withCredentials:true});
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteProduct(productId: number): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete(url);
  }

  getProductById(productId: number): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get(url);
  }

  updateProduct(productId: any, product: Object){
    const url = `${this.apiUrl}/${productId}`;
    return this.http.put(url, product);
  }
}
