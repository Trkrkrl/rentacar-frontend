import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetails } from '../models/carDetails';
import { CarImage } from '../models/carImage';
import { listResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  
  apiUrl='http://localhost:44396/api/'


  constructor(private httpClient: HttpClient) { }


  getCarImages():Observable<listResponseModel<CarImage>> {
    return this.httpClient.get<listResponseModel<CarImage>>(this.apiUrl+"carimages/getall");
  }

  getImagesByCarId(carId:number):Observable<listResponseModel<CarImage>> {
    let newPath=this.apiUrl+"CarImages/getbycarid?carId="+carId;
    return this.httpClient.get<listResponseModel<CarImage>>(newPath);
  }

 

}
