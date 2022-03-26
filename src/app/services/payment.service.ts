import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { Payment } from '../models/payment';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/ResponseModel';
import { AuthService } from './auth.service';
import { CardService } from './card.service';
import { RentalService } from './rental.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  rentals:Rental
  totalPrice:number;
  payment:Payment;
  apiUrl='https://localhost:44396/api/Payments/'
  cardAddRequest:boolean


  constructor(private httpClient: HttpClient,// payment comp.ts card işşlemlerini buraya aktarıyor card service eklemeyi unutma
    private rentalService: RentalService,
    private authService: AuthService,
    private cardService: CardService,
    private toastrService: ToastrService,//ekranın alltında success mesajı gelecek unutma toastr ı
    
    ) { }



    addPayment(payment: Payment): Observable<ResponseModel> {
      let newPath = this.apiUrl + 'add';
      return this.httpClient.post<ResponseModel>(newPath, payment);
    }
    
    setPaymentModel(card: Card) {
      this.payment = <Payment> {
        customerId: this.authService.user.customerId,
        cardNumber: card.cardNumber,
        totalAmount: this.totalPrice
      };
      return this.payment;
    
    }

    setRental(rental: Rental) {//rentals da bu methodu çağırıyor, ama çalışmıyor sanki
      this.rentals = rental;
    }
    
    
    addRentalAfterPaymentAndCardInfoCompleted(card: Card) {
      if (this.cardAddRequest === true) {
        this.cardService.addCard(card).subscribe(response => {
          this.setPaymentModel(card);
          this.addPayment(this.payment).subscribe(response => {
            this.rentalService.addRental(this.rentals).subscribe(response => {
              this.toastrService.success('Success.');
            }, responseError => {
              this.toastrService.error(responseError.errors, 'You do not have enough Findex points to rent this car.');
            });
          });
        }, responseError => {
          this.toastrService.error('Invalid credit card informations.');
        });
      }else{
        console.log("paymentte başladık")
        this.setPaymentModel(card);
        this.addPayment(this.payment).subscribe(response => {
          this.rentalService.addRental(this.rentals).subscribe(response => {
            this.toastrService.success('Success.');
            console.log("paymentte add payment içerisinde rentall gönder")
          }, responseError => {
            this.toastrService.error(responseError.errors, 'You do not have enough Findex points to rent this car.');
          });
        })
      }
    }
}
