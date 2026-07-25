import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingVM, CheckoutItem } from 'src/app/models/BookingVM';
import { BookingService } from 'src/app/services/booking.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CommonService } from 'src/app/services/common.service';
import { ToursService } from 'src/app/services/tours.service';
import { BookingStatus } from 'src/app/shared/enums';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  // User Details
  userName: string = 'anc';
  userEmail: string = 'test@gmail.com';
  userMobile: string = '+94 769960883';

  // Booking Details
  vehicleType: string = 'Budget';
  vehicleModel: string = 'Wagon R';
  pickupDate: string = '12 February 2026 20:45';
  pickupLocation: string = 'BIA Arrival Terminal, Katunayake, Sri Lanka';
  dropLocation: string = 'Ella, Sri Lanka';

  // Add-ons
  enableNameBoard: boolean = false;
  nameBoardText: string = '';

  // Payment Details
  budgetAmount: number = 43571.45;
  advancePaymentPercentage: number = 50;

  // Payment Method
  selectedPaymentMethod: string = 'card';

  userDetails: any;
  tourDetails: any;
  bookingId: string = '';
  bookingData!: BookingVM;
  isHideConfirmButton: boolean = true;

  constructor(private tourService: ToursService,
    private bookingService: BookingService,
    private checkoutService: CheckoutService,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute) {
    if (tourService.airportPickupTourInfo) {
      this.userDetails = tourService.airportPickupTourInfo?.personalInfo;
      this.tourDetails = tourService.airportPickupTourInfo?.tourInfo;

      if (this.userDetails || this.tourDetails) {
        //this.router.navigate(['/']);
      }
    }
    else {
      //this.router.navigate(['/']);
      var tourData = localStorage.getItem('tourData');
      if (tourData) {
        this.tourDetails = JSON.parse(tourData);
      }

      var userData = localStorage.getItem('userData');
      if (userData) {
        this.userDetails = JSON.parse(userData);
      }
    }
    this.bookingId = this.route.snapshot.params['bookingId'];
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.commonService.scrollToTop();
    if (this.bookingId != '') {
      this.getBookingDetailsById();
    }
  }

  get advancePaymentAmount(): number {
    return (this.budgetAmount * this.advancePaymentPercentage) / 100;
  }

  get totalPayment(): number {
    return this.budgetAmount;
  }

  getBookingDetailsById() {
    this.bookingService.getBookingDetailsById(this.bookingId).then((res) => {
      this.bookingData = res.data() as BookingVM;
      if (this.bookingData.status == BookingStatus.InProgress) {
        this.isHideConfirmButton = false;
      }
      console.log(this.bookingData);
    })
    .catch((error) => {
      console.log('Something went wrong!');
    })
  }

  onBack(): void {
    console.log('Back button clicked');
    // Add navigation logic here
  }

  onConfirmRide(): void {
    var products: CheckoutItem[] = [];
    products.push({
      name: `${this.bookingData.pickup.address} to ${this.bookingData.dropoff.address}`,
      price: this.bookingData.totalPrice,
      qty: 1
    });

    this.checkoutService.onProceedToPay(products, this.bookingId);
  }
}
