import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CarDetails } from 'src/app/models/carDetails';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { RentalDetails } from 'src/app/models/rentalDetails';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {
  rentalDetails:RentalDetails[] = [];
  dataLoaded: boolean = false;
  //--
  rentDate:Date;
  returnDate:Date;
 // state:number=1;
  rentals:Rental;
  message:string|null;
  minDate:string|null
  maxDate:string|null
  
  car:CarDetails;
  customerDetails:Customer[] = [];
  firstDateSelected:boolean= false; // rentDate seçili değilse, returnDate aktif olmayacak.
  state:number = 1;
  customerId:number
  

  @Input() carforRent:CarDetails//carDetails ten mirasçı , veri çekmeyi sağlayacak,rental html in çalışmasını sağlayacak-car bilgisini böyle alacak


  constructor(private rentalService: RentalService,
    private authService: AuthService,
    private paymentService: PaymentService,
    private datePipe: DatePipe,
    private router: Router,
    private modalService:NgbModal,
    private activeModal:NgbModal ,
   // public modal:NgbActiveModal,
    private activatedRoute:ActivatedRoute,
    private carService: CarService,
    private RentalService: RentalService,
    private customerService: CustomerService,
    private toastrService: ToastrService




    

    ) { }

  ngOnInit(): void {
    this.getCarRentalDetails();
    this.getCustomerDetails();
    this.minDate=new Date().toISOString().split("T")[0] // uzun bir tarih ve zaman bilgisi geldi 
                                                        //onu split ile yalnızca tarih kısmını alacak şekilde böldük
    this.rentDate = new Date(this.minDate); // rentDate Date türünde olduğu için, string türündeki minDate i Date türüne çevirdik.

    
    

  }
  getCarRentalDetails() {
    this.RentalService.getCarRentalDetails().subscribe((response) => {
      this.rentalDetails = response.data;
      this.dataLoaded = true;
    });
  }
  getCustomerDetails() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customerDetails = response.data;
    });
  }


  addRentalCar() {
    let rental :Rental={
      carId: this.carforRent.carId,
      customerId:this.authService.user.customerId,//kullanıcı auth  kontrol edildi , yazdık bi kenara
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      
    };
    
      this.paymentService.setRental(rental);
      console.log(rental);//yazmıyor
      console.log(rental.customerId);//yazmıyor
      this.toastrService.success('Talebiniz alındı ödemeye yönlendiriliyorsunuz.');
      console.log("talep oluşturuldu")
  
      this.state =2;//2.tip modalı açacak bu

    

   

  }


  onChangeEvent(event: any){
    this.minDate = event.target.value
    this.firstDateSelected = true
  }


  checkReturnDate(){
    if (this.returnDate < this.rentDate) {
      this.returnDate = this.rentDate
    }
  }

  totalAmount(){
    let differance = new Date(this.returnDate).getTime() - new Date(this.rentDate).getTime();
    let amount = new Date(differance).getDate();
    this.paymentService.totalPrice = amount * this.carforRent.dailyPrice;
  }
}
