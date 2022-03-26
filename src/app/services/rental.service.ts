import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { listResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { RentalDetails } from '../models/rentalDetails';
import { ResponseModel } from '../models/ResponseModel';
import{CarDetails} from '../models/carDetails';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl='https://localhost:44396/api/Rentals/'
  
  


  constructor(private httpClient: HttpClient,
    ) { }


    getCarRentalDetails(): Observable<listResponseModel<RentalDetails>> {
      let newPath = this.apiUrl + 'getrentaldetails';
      return this.httpClient.get<listResponseModel<RentalDetails>>(newPath);
    }
  
    getRentalCars(): Observable<listResponseModel<RentalDetails>> {
      let newPath = this.apiUrl + 'GetAll';
      return this.httpClient.get<listResponseModel<RentalDetails>>(newPath);
    }
  
//tüm koşullar ok ise payment service de  çalıştırılarak kullanılan rentali  servera ekle methodu
  addRental(rental:Rental): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'Add'
    return this.httpClient.post<ResponseModel>(newPath, rental);
  }









}
