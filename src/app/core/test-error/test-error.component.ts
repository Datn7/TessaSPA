import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss'],
})
export class TestErrorComponent implements OnInit {
  baseUrl = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  ngOnInit(): void {}

  get404Error() {
    this._http.get(this.baseUrl + 'products/2').subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get500Error() {
    this._http.get(this.baseUrl + 'buggy/servererror').subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get400Error() {
    this._http.get(this.baseUrl + 'buggy/badrequest').subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get400ValidationError() {
    this._http.get(this.baseUrl + 'products/oriJimaoba').subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
