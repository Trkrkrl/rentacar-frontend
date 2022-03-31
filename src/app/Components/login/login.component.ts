import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators,FormControl} from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
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

  registerForm:FormGroup
  customer:Customer

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    public modalService:NgbModal,
    private jwtHelper: JwtHelperService,
    private customerService: CustomerService,
    ) { }


  ngOnInit(): void {
    this.addLoginForm();
    this.createRegisterForm();
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
      //bunu deniyorum olmadı yapcak bş yok

      this.toastrService.success('Logged In.')

    }, responseError => {
      this.toastrService.error(responseError.errors, 'Password Invalid.')
      })
    }else{
      this.toastrService.error("Form invalid.")
    }
  }
closeModal(id: string) {
  if(this.authService.loggedIn()) {
    this.modalService.dismissAll();
  }
  
}

//---------------------register elemanlari
createRegisterForm(){
  this.registerForm = this.formBuilder.group({
    firstName : ['', Validators.required],
    lastName : ['', Validators.required],
    email : ['', Validators.required],
    password : ['', Validators.required],
    companyName:[`firsrname in sirketi`, Validators.required]
  })
}


register(){
  if (this.registerForm.valid){
    let registerModel = Object.assign({},this.registerForm.value);
    this.authService.register(registerModel).subscribe(response=>{
      this.toastrService.info(response.message,"registered")
      this.localStorageService.saveToken(response.data.token)
      this.registerForm.reset();
     
      ///this.authService.getUser()
     // this.router.navigate(['/']);//bu kısımdan emin değilim
      this.toastrService.success(response.message,'Registered.')
      

      //bir de customer eklensin
      
    }, responseError =>{
      if(responseError.error.Errors.length>0){
        for (let i=0; i<responseError.error.Errors.length; i++){
          this.toastrService.error(responseError.error.Errors[i].ErrorMessage, 'Validation Exception')
        }
      }
    })
  }else{
    this.toastrService.error('Form Invalid.')
  }
}







}
