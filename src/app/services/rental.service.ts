import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { listResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { RentalDetails } from '../models/rentalDetails';


@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl='https://localhost:44396/api/Rentals/'


  constructor(private httpClient: HttpClient) { }


  getRentals():Observable<listResponseModel<RentalDetails>> {
    let newPath= this.apiUrl+"getrentalsdetails"
    return this.httpClient.get<listResponseModel<RentalDetails>>(newPath);
      
      

  }
}
