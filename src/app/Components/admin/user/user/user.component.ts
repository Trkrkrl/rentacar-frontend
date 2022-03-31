import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserUpdateModel } from 'src/app/models/userUpdateModel';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userId:number;
  user:UserUpdateModel;
  updateUserForm:FormGroup;
  updatePasswordForm:FormGroup;

  constructor(
    private toastrService: ToastrService,
    private userService:UserService,
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private localStorage:LocalStorageService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.updateForm();
    this.getUserById();
    this.createupdatePasswordForm();
  }



  
  getUserById(){
    let token = this.localStorage.getToken()
    let id:number=Number(Object.values(this.authService.decodedToken(token))[0])
    this.userId=id;
    this.userService.getByUserId(id).subscribe(response=>{
      this.user = response.data;  
    })

  }

  updateForm(){
    this.updateUserForm = this.formBuilder.group({
      userId:[''],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      email:['',Validators.required]

    })
  }

  updateUser(){
    if (this.updateUserForm.valid) {
      let userModel = Object.assign({},this.updateUserForm.value)
      let token = this.localStorage.getToken()
      let id:number=Number(Object.values(this.authService.decodedToken(token))[0])
      userModel.userId = id;
      this.userService.updateUser(userModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.localStorage.removeToken();
       // this.router.navigate(["/login"])    
      },responseError=>{
        this.toastrService.error("güncellenmedi")
      })
      
    }
    else{
      this.toastrService.warning("Form eksik","dikkat!")
    }
  }
  
  createupdatePasswordForm(){
    this.updatePasswordForm =this.formBuilder.group({
      email:["",Validators.required],
      oldPassword:["",Validators.required],
      newPassword:["",Validators.required]
    })

  }

  updatePassword(){
    console.log(this.updatePasswordForm.value)
  if (this.updatePasswordForm.valid) {
    let updatePassword = Object.assign({},this.updatePasswordForm.value)
    this.userService.changePassword(updatePassword).subscribe(response=>{
      this.toastrService.success(response.message,"başarılı")
      this.localStorage.removeToken();
      //this.router.navigate(["/login"])
    },responseError=>{
      this.toastrService.error("güncellenmedi")
    })
    
  }
  else{
    this.toastrService.warning("Form eksik","Dikkat !")
  }
  }

}
