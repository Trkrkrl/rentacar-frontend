import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  userInfo:User=this.authService.getUser()

  constructor(private authService: AuthService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService,
    private router: Router,

    
    ) { }

  ngOnInit(): void {
  }





  isAuthenticated(){
    return this.authService.loggedIn();
  }

  logout(){
    this.localStorageService.removeToken();
    this.toastrService.success("başarı ile çıkış yaptınız")
    this.router.navigate(["/cars"])
  }

  goToAdminEdit(){
     this.router.navigate(["admin/user"]) 
  }

  ngDoCheck(){  
    if(this.userInfo!==this.authService.user){
      this.userInfo = this.authService.user;
    }
  }
  isAdmin(){
    
  }
}
