import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { CarDetails } from '../models/carDetails';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiUrl='https://localhost:44396/api/'


  constructor(private httpClient: HttpClient) { }



  getCars():Observable<listResponseModel<CarDetails>>{
    return this.httpClient.get<listResponseModel<CarDetails>>(
      this.apiUrl +'Cars/getcardetails'
      
      );
  }

  getCarsDetailsByCarId(carId:number):Observable<listResponseModel<CarDetails>>{
    let newPath = this.apiUrl +"Cars/GetCardetailsByCarId?carId="+carId;
    return this.httpClient.get<listResponseModel<CarDetails>>(newPath);
  }

  getCarsByBrandId(brandId:number):Observable<listResponseModel<CarDetails>>{
  let newPath = this.apiUrl +"Cars/getbybrandId?brandId="+brandId;
    return this.httpClient.get<listResponseModel<CarDetails>>(newPath)
  }
  getCarsByColorId(colorId:number):Observable<listResponseModel<CarDetails>>{
    let newPath = this.apiUrl +"Cars/getbycolorId?colorId="+colorId;
      return this.httpClient.get<listResponseModel<CarDetails>>(newPath)
    }
  getCarsDetailByBrandAndColorId(colorId:number,brandId:number):Observable<listResponseModel<CarDetails>>{
    let newPath = this.apiUrl +"Cars/GetCarDetailsByColorAndByBrand?colorId="+colorId+ "&brandId=" +brandId;
    return this.httpClient.get<listResponseModel<CarDetails>>(newPath)
  }
  
























}
