import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPagination } from './models/pagination.model';
import { IProduct } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TessaSPA';
  products: IProduct[];

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {
    this._http.get('http://localhost:5000/api/product').subscribe(
      (res: IPagination) => {
        this.products = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
