import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/ResponseModel';
import { RentalService } from './rental.service';
import {Card} from '../models/card';
import { listResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  apiUrl='https://localhost:44396/api/Cards/'

  constructor(private httpClient: HttpClient,
    private rentalService: RentalService,
    private toastrService: ToastrService) { }
  //bu servis backennden belirli bir kullanıcı id ye sahip birinini card bilgilerini almaya ve
  //ve  card ekleme ye yarayacak iki method icermektedir

  addCard(card: Card): Observable<ResponseModel> {//cardmodeil import etmek gerekti tanımaz yoksa
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, card);
  }


  getCardsByCustomer(customerId: number): Observable<listResponseModel<Card>> {
    let newPath = this.apiUrl + 'getcardsbycustomerid?customerId=' + customerId;
    return this.httpClient.get<listResponseModel<Card>>(newPath);
  }
}
