import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand.model';
import { IPagination } from '../shared/models/pagination.model';
import { IType } from '../shared/models/productType.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'http://localhost:5000/api/';

  constructor(private _http: HttpClient) {}

  getProducts(brandId?: number, typeId?: number) {
    let params = new HttpParams();

    if (brandId) {
      params = params.append('brandId', brandId.toString());
    }

    if (typeId) {
      params = params.append('typeId', typeId.toString());
    }

    return this._http
      .get<IPagination>(this.baseUrl + 'product', {
        observe: 'response',
        params,
      })
      .pipe(
        map((res) => {
          return res.body;
        })
      );
  }

  getBrands() {
    return this._http.get<IBrand[]>(this.baseUrl + 'product/brands');
  }

  getTypes() {
    return this._http.get<IType[]>(this.baseUrl + 'product/types');
  }
}
