import { Component, OnInit } from '@angular/core';
import { IBrand } from '../shared/models/brand.model';
import { IProduct } from '../shared/models/product.model';
import { IType } from '../shared/models/productType.model';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  brandIdSelected: number;
  typeIdSelected: number;

  constructor(private _shopService: ShopService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts() {
    this._shopService
      .getProducts(this.brandIdSelected, this.typeIdSelected)
      .subscribe(
        (res) => {
          this.products = res.data;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getBrands() {
    this._shopService.getBrands().subscribe(
      (res) => {
        this.brands = [{ id: 0, name: 'All' }, ...res];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getTypes() {
    this._shopService.getTypes().subscribe(
      (res) => {
        this.types = [{ id: 0, name: 'All' }, ...res];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBrandSelected(brandId: number) {
    this.brandIdSelected = brandId;
    this.getProducts();
  }

  onTypeSelected(typeId: number) {
    this.typeIdSelected = typeId;
    this.getProducts();
  }
}
