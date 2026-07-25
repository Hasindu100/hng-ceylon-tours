import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingVM } from 'src/app/models/BookingVM';
import { BookingService } from 'src/app/services/booking.service';
import { BookingStatus } from 'src/app/shared/enums';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent {
  payment = {
    amount: '84.00',
    transactionId: '#TXN-29471-C',
    date: 'Apr 5, 2026 · 10:42 AM',
    method: 'Visa •••• 4821'
  };

  bookingId: any;
  bookingData: any;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute,
    private bookingService: BookingService,
    private router: Router) {
    // get quaery params of orderId and sessionId
    this.route.queryParams.subscribe(params => {
      this.bookingId = params['booking_id'];
      const sessionId = params['session_id'];

      if (this.bookingId) {
        this.getBookingDetailsById();
      }
    });
  }

  getBookingDetailsById() {
    this.bookingService.getBookingDetailsById(this.bookingId).then((res) => {
      this.bookingData = res.data() as BookingVM;
      this.bookingService.updateBookingStatus(this.bookingId, BookingStatus.Completed).then(() => {
        console.log('Booking status updated successfully');
        this.isLoading = false;
      }).catch((error) => {
        console.error('Error updating booking status:', error);
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
