import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PasswordUpdate } from '../models/passwordUpdate';
import { ResponseModel } from '../models/ResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserUpdateModel } from '../models/userUpdateModel';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl='https://localhost:44396/api/'

  //user bilgsiini güncellemek için servisler yazacağız, ama get etmek lazım bilgileri, şifre değişmek için aytı bir method daha gerekli
//bir model lazım
  constructor(private httpClient: HttpClient) { }

  updateUser(userUpdateModel:UserUpdateModel):Observable<ResponseModel>{
    let newPath= this.apiUrl + "Users/update"
    return this.httpClient.post<ResponseModel>(newPath,userUpdateModel);
  }

  getByUserId(userId:number):Observable<SingleResponseModel<UserUpdateModel>>{
    let newPath = this.apiUrl + "Users/getbyid?id="+userId;
    return this.httpClient.get<SingleResponseModel<UserUpdateModel>>(newPath)

  }

  changePassword(passwordUpdate:PasswordUpdate):Observable<ResponseModel>{
    let newPath = this.apiUrl +"Users/changeuserpassword"
    return this.httpClient.post<ResponseModel>(newPath,passwordUpdate);
  }
}
