import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBrand } from '../shared/models/brand.model';
import { IPagination } from '../shared/models/pagination.model';
import { IType } from '../shared/models/productType.model';

import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl = 'http://localhost:5000/api/';

  constructor(private _http: HttpClient) {}

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }

    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageIndex', shopParams.pageSize.toString());

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

  getProduct(id: number) {
    return this._http.get<IProduct>(this.baseUrl + 'product/' + id);
  }

  getBrands() {
    return this._http.get<IBrand[]>(this.baseUrl + 'product/brands');
  }

  getTypes() {
    return this._http.get<IType[]>(this.baseUrl + 'product/types');
  }
}
