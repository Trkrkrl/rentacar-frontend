import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetails } from 'src/app/models/carDetails';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NonNullAssert } from '@angular/compiler';
import { LoginComponent } from '../login/login.component';
import { RentalComponent } from '../rental/rental.component';
import { RentalService } from 'src/app/services/rental.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {
  //carDetail:CarDetails[]= [];
  cars: CarDetails[] = [];
  carImagePaths:string[] = [];
  carDetail: CarDetails;
  dataLoaded = false;
  imageUrl:string="https://localhost:44396/Uploads/images/"
  //--for rental
  
 
  
  
  carImages:CarImage[]=[];//slider için

  constructor(private carImageService: CarImageService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    public modalService:NgbModal,
    private rentalService:RentalService,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {


    this.activatedRoute.params.subscribe(params => {//car id verilirse ki arabaya tiklayinca verilmis olur: icerdeki emthodlari calistir

      if(params['carId']){
          this.getCarsDetailsByCarId(params['carId'])
         // this.getImagesByCarId(params['carId'])

        }
    })

    
  }

 
  




  getCarsDetailsByCarId(carId: number){//details sayfamızdaki araç detaylarını çekiyor
    this.carService.getCarsDetailsByCarId(carId).subscribe((response)=>{
      this.cars=response.data
      this.carDetail = response.data[0];//sıfırıncı eement bilgilerin olduğu kısım,sonra mesaj felan geliyor
      
      this.carImagePaths=this.carDetail.imagePath
      this.dataLoaded = true;

    })
  }

  // geçici olarak login li isAuthenticated:true/false mutlaka sil bunu sonra
  isAuthenticated(){
    return this.authService.loggedIn()
  }
    
 /* openLoginModal() {//LOGİN MODAL ı açar (cardetailhtmldeki buton)
    let modalRef=this.modalService.open(LoginComponent)
  }
  openRentalModal(){
    let modalRef= this.modalService.open(RentalComponent)
    //buraya tıkalyınca hem rentala gitmeli
    
  

  }*/
  
  

  
}
  



