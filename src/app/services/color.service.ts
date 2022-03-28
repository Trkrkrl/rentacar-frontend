import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { listResponseModel } from '../models/listResponseModel';
import { Color } from '../models/color';
import { ResponseModel } from '../models/ResponseModel';


@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl='https://localhost:44396/api/'


  constructor(private httpClient: HttpClient) { }
  getColors():Observable<listResponseModel<Color>>{
    return this.httpClient.get<listResponseModel<Color>>(
      this.apiUrl +'Colors/GetAll'
      
      );

  }
  //add delete update ekleyelim
  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"Colors/Add",color)
  }

  
  deleteColor(color:Color):Observable<ResponseModel>{
    
   let newPath=this.apiUrl+"Colors/Delete"
    return this.httpClient.post<ResponseModel>(newPath,color)

  }

  updateColor(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Colors/Update"
    return this.httpClient.post<ResponseModel>(newPath,color);
  }
}
