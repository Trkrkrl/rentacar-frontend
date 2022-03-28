import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/ResponseModel';

@Injectable({
  providedIn: 'root'
})

export class BrandService {
  apiUrl='https://localhost:44396/api/';  

  constructor(private httpClient: HttpClient) { }

  getBrands():Observable<listResponseModel<Brand>>{
    return this.httpClient.get<listResponseModel<Brand>>(
      this.apiUrl +'Brands/GetAll'
      
      );

  }

  getByBrandId(brandId:number):Observable<SingleResponseModel<Brand>>{
    return this.httpClient.get<SingleResponseModel<Brand>>(this.apiUrl+"Brands/GetById?id="+brandId)
  }
  //----------------------------------------------------------------
  //add delete update ve getby id methodlarini ekleyelim
  
  
  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"Brands/Add",brand)
  }

  

  deleteBrand(brand:Brand):Observable<ResponseModel>{
    
   let newPath=this.apiUrl+"Brands/Delete"
    return this.httpClient.post<ResponseModel>(newPath,brand)
  
  }

  updateBrand(brand:Brand):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Brands/Update"
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }



}
