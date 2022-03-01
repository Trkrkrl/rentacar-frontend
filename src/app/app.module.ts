import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import{FormsModule} from '@angular/forms';


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
    ColorPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule.forRoot(),
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
