import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { listResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl='https://localhost:44396/api/'


  constructor(private httpClient: HttpClient) { }
  getRentals():Observable<listResponseModel<Rental>>{
    return this.httpClient.get<listResponseModel<Rental>>(
      this.apiUrl +'Rentals/GetAll'
      
      );

  }
}
