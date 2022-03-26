import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { listResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl='https://localhost:44396/api/'


  constructor(private httpClient: HttpClient) { }
  getCustomers():Observable<listResponseModel<Customer>>{
    return this.httpClient.get<listResponseModel<Customer>>(
      this.apiUrl +'Customers/GetAll'
      
      );

  }//single response model: login gibi işlemlerde gönderdiğimiz şeyin kalıbı belli olsun diye
  getCustomerByUserId(userId:number) : Observable<SingleResponseModel<Customer>>{
    let newPath = this.apiUrl + "Customers/getbyuserid?userId=" + userId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }

}
