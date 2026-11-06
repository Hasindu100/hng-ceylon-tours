import { Component } from '@angular/core';
import { serverTimestamp } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingVM, PaymentVM } from 'src/app/models/BookingVM';
import { BookingService } from 'src/app/services/booking.service';
import { PaymentService } from 'src/app/services/payment.service';
import { BookingStatus, PaymentOption, PaymentStatus } from 'src/app/shared/enums';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';

@Component({
    selector: 'app-payment-success',
    templateUrl: './payment-success.component.html',
    styleUrls: ['./payment-success.component.scss'],
    standalone: true,
    imports: [
      LoaderComponent
    ]
})
export class PaymentSuccessComponent {
  payment = {
    amount: '84.00',
    transactionId: '#TXN-29471-C',
    date: 'Apr 5, 2026 · 10:42 AM',
    method: 'Visa •••• 4821'
  };

  bookingId: any;
  sessionId: any;
  bookingData: any;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute,
    private bookingService: BookingService,
    private paymentService: PaymentService,
    private router: Router) {
    // get quaery params of orderId and sessionId
    this.route.queryParams.subscribe(params => {
      this.bookingId = params['booking_id'];
      this.sessionId = params['session_id'];

      if (this.bookingId) {
        this.getBookingDetailsById();
      }
    });
  }

  getBookingDetailsById() {
    this.bookingService.getBookingDetailsById(this.bookingId).then((res) => {
      this.bookingData = res.data() as BookingVM;
      // this.bookingService.updateBookingStatus(this.bookingId, BookingStatus.Completed).then(() => {
      //   console.log('Booking status updated successfully');
      //   this.isLoading = false;
      // }).catch((error) => {
      //   console.error('Error updating booking status:', error);
      //   this.isLoading = false;
      // });
      const totalPrice = this.bookingData.totalPrice;
      const amountPaid = (this.bookingData.paymentOption == PaymentOption.Advanced && this.bookingData.paymentStatus != PaymentStatus.PartiallyPaid) ? totalPrice * (20 / 100) : totalPrice;
      const remainingAmount = totalPrice - amountPaid;
      let bookingPaymentData = {
        status: BookingStatus.Completed,
        paymentStatus: this.bookingData.paymentOption == (this.bookingData.paymentOption == PaymentOption.Advanced && this.bookingData.paymentStatus != PaymentStatus.PartiallyPaid) ? PaymentStatus.PartiallyPaid : PaymentStatus.Paid,
        amountPaid: amountPaid,
        remainingAmount: remainingAmount,
        paidAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }

      const paymentData: PaymentVM = {
        bookingId: this.bookingId,
        amount: amountPaid,
        paymentMethod: 1,
        transactionId: this.sessionId,
        status: PaymentStatus.Paid,
        createdAt: new Date()
      }

      this.bookingService.updateBookingPaymentData(this.bookingId, bookingPaymentData).then(() => {
        this.paymentService.savePaymentData(paymentData).then(() => {
          console.log('Payment data updated successfully');
          this.isLoading = false;
        })
      }).catch((error) => {
        console.error('Error updating payment data:', error);
        this.isLoading = false;
      });

    })
    .catch((error) => {
      console.log('Something went wrong!');
      this.isLoading = false;
    })
  }
 
  viewBooking(): void {
    // Navigate to booking details page
    this.router.navigate(['/booking-history']);
  }
 
  downloadReceipt(): void {
    // Trigger receipt download
    console.log('Download receipt clicked');
  }
}
