import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { CustomerService } from './customer.service';
import {LocalStorageService} from './local-storage.service';


@Injectable({ 
  providedIn: 'root'
})
export class AuthService {
  user: User
  token :string | null= ""  
  decodedTokenKey: any;//login de lazım oluyor

  apiUrl='https://localhost:44396/api/Auth/'

  constructor(private httpClient: HttpClient,
    private customerService: CustomerService,
    private jwtHelper: JwtHelperService,
    private localStorageService: LocalStorageService,


    ) { }




//----- aşağıdaki get user methodu, token bilgisine sahip oludğumuz kullanıcınn  user bilgileirine ulaşmak için lazım, bu user bilgileri
// diğer yerlerde lazim oalaacak

  decodedToken(token: any) {
    return this.jwtHelper.decodeToken(token);//jwt aracı sayesinde mevcut şifrelenmiş tokeni çözeriz-jwtherperserviceyi ctora yazdık artık kkuşlanaibliriz
  }
  loggedIn() {//giriş yapılı - token e bakarak kontrol edelim

    if (this.localStorageService.getToken()) {//local storageden token çekebiliyorsan-yani orada token var ise
      return this.jwtHelper.isTokenExpired();//çektiğin tokene bak:tarihi geçmişse true dönmesi gerekmez mi-logged in false gelir hep
      //demekki istokenexpired mantık dıı çalışıyor-Geçerli mi sorusuna cevap veriyo tarihi geçmişse true döneceğine , false dönüp, 
      //not legged in olduğunu belirtiyor
    } else {
      return false;
    }
  }

  getUser() {//user bilgilerini çekmemiz  lazım
    let decodedToken = this.decodedToken(this.localStorageService.getToken());//localstorage esrvis gerekli
    console.log(decodedToken)//bir görelim token geliyormu

    if (decodedToken) {//elimizde çözülmüş tokenimiz var ise

      if(this.loggedIn()){//loggedn in açıklaması yukarda
        //aşapıdaki 3 komutun işleyiş şeklini bilmiyorum
        //ama decoded token içerisinden username , userid ve user role u bir şekilde aldıkları aşikar

        let tokenInfoName = Object.keys(decodedToken).filter(u => u.endsWith('/name'))[0];
        let userName = String(decodedToken[tokenInfoName]);

        let tokenInfoId = Object.keys(decodedToken).filter(u => u.endsWith('/nameidentifier'))[0];
        let userId = Number(decodedToken[tokenInfoId]);

        let claimInfo = Object.keys(decodedToken).filter(u => u.endsWith('/role'))[0];
        let roles = decodedToken[claimInfo];


        let tokenInfoEmail = decodedToken.email;

        this.user = {
          userName: userName,
          userId: userId,
          email: tokenInfoEmail,
          roles: roles,
          companyName :"",
          customerId : 0
        };
       
        this.getCustomerbyUserId(userId);//aşapıdaki 2. method, user id verip customer verisi alıyoruz
      }
    }
    return this.user;//user bilgisi tanımlı artık dönelim ve artık kullanılabilir olsun
  }
  //login methodu çalışınca login modelde tanımlı bilgileri aşağıdakkki apiıurl ye gönderecek ve dönüş olarak token model tipinde bir dönüş alacak
  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, loginModel);
  }

  getCustomerbyUserId(userId : number){
    this.customerService.getCustomerByUserId(userId).subscribe(response =>{
      console.log(response.data)
      this.user.customerId = response.data.customerId
      this.user.companyName = response.data.companyName;
    })
  }
  //--register

  register(registerModel:RegisterModel):Observable<SingleResponseModel<TokenModel>>{
    let newPath = this.apiUrl + "register";
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath,registerModel);
  }
  
  isAdmin(){
    let isAdmin=false;
    if(this.loggedIn()){
      this.user.roles?.toString().split(",").map(role=> {
        if(role.toLocaleLowerCase().indexOf("admin")!== -1){
           isAdmin=true;
          
        }

      })
    }
    return isAdmin;
  }
  isAuthenticated(){
    if (this.localStorageService.getToken()) {
      return true;
    }
    else{
      return false;
    }
  }

}

