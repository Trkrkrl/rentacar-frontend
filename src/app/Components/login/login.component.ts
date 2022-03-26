import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl} from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //gelinenSayfa:string = '' burayi aşağıda if else ile verip gelinen sayfaya geri yönlendirme?-modalda gerek varmı ki
  loginForm: FormGroup
  decodedToken:any;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    public modalService:NgbModal,
    private jwtHelper: JwtHelperService
    ) { }


  ngOnInit(): void {
    this.addLoginForm();
  }
//login methodunda işlemden sonra yönlendireceğği sayfa var , bu sayfayı gelinen sayfa olarak ayarlayabilrim
addLoginForm(){//form builder,formgruppivalidators,form control
  this.loginForm = this.formBuilder.group({
    'email' : ['', Validators.required],
    'password' : ['', Validators.required]
  })
}

login(){
  if(this.loginForm.valid){
   //console.log(this.loginForm.value);
    let loginModel = Object.assign({},this.loginForm.value)

    this.authService.login(loginModel).subscribe(response=>{
      this.localStorageService.saveToken(response.data.token)
      this.authService.decodedTokenKey = this.authService.decodedToken(response.data.token)
      this.authService.getUser()
      //giriş başarılı ise  modalı kapat?
      this.closeModal("loginModalFront")//bunu deniyorum olmadı yapcak bş yok

      this.toastrService.success('Logged In.')

    }, responseError => {
      this.toastrService.error(responseError.errors, 'Password Invalid.')
      })
    }else{
      this.toastrService.error("Form invalid.")
    }
  }
closeModal(id: string) {
  this.modalService.dismissAll(id);
}








}
