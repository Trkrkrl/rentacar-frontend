import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './Components/brand/brand.component';
import { CarComponent } from './Components/car/car.component';
import { ColorComponent } from './Components/color/color.component';
import { CustomerComponent } from './Components/customer/customer.component';
import { RentalComponent } from './Components/rental/rental.component';
import { NaviComponent } from './Components/navi/navi.component';
import { CardetailComponent } from './Components/cardetail/cardetail.component';
import { CarImageComponent } from './Components/car-image/car-image.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CarFilterPipe } from './pipes/car-filter.pipe';
import { BrandPipePipe } from './pipes/brand-pipe.pipe';
import { ColorPipePipe } from './pipes/color-pipe.pipe';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PaymentComponent } from './Components/payment/payment.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './Components/login/login.component';
import { DatePipe } from '@angular/common';
//import { ModalModule } from 'ngx-bootstrap/modal';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { JwtModule } from '@auth0/angular-jwt';

import { BrandAddComponent } from './Components/admin/add/brand-add/brand-add.component';
import { CarAddComponent } from './Components/admin/add/car-add/car-add.component';
import { ColorAddComponent } from './Components/admin/add/color-add/color-add.component';
import { CarDetailManageComponent } from './Components/admin/car-detail-manage/car-detail-manage.component';
import { UserComponent } from './Components/admin/user/user/user.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}


@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    CarComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    NaviComponent,
    CardetailComponent,
    CarImageComponent,
    CarFilterPipe,
    BrandPipePipe,
    ColorPipePipe,
    PaymentComponent,
    LoginComponent,
    
    BrandAddComponent,
    CarAddComponent,
    ColorAddComponent,
    CarDetailManageComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,//bu token ggeter içi yukarda method gerekiymiş
        allowedDomains: ["http://localhost:4200/"]
        //disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
   // NgbModule,
    ReactiveFormsModule,
   // ModalModule.forRoot()
   BrowserAnimationsModule,
   ToastrModule.forRoot({
    positionClass:"toast-bottom-right"
  }),

  ],
  providers: [DatePipe,{
    provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
