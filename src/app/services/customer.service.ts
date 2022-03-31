import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { listResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/ResponseModel';


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

  //bir şekilde customer ekleyebilmeliyiz
  addCustomer(customer:Customer):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "Customers/Add",customer)
  }

  updateCustomer(customer:Customer):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl + "Customers/Update",customer)
  }
}
