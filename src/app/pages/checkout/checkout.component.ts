import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BookingVM, CheckoutItem } from 'src/app/models/BookingVM';
import { OrderSummaryComponent } from 'src/app/sections/order-summary/order-summary.component';
import { BookingService } from 'src/app/services/booking.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CommonService } from 'src/app/services/common.service';
import { ToursService } from 'src/app/services/tours.service';
import { DateTimeComponent } from 'src/app/shared/components/date-time/date-time.component';
import { BookingStatus, PaymentOption, PaymentStatus } from 'src/app/shared/enums';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      OrderSummaryComponent,
      LoaderComponent,
      DateTimeComponent
    ]
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

  // Payment Plan
  selectedPaymentPlan: PaymentOption = PaymentOption.Full;
  totalAmount: number = 0;
  payableAmount: number = 0;
  remainingAmount: number = 0;
  advancedAmount: number = 0;

  userDetails: any;
  tourDetails: any;
  bookingId: string = '';
  bookingData!: BookingVM;
  isHideConfirmButton: boolean = true;
  paymentOption = PaymentOption;
  isHiddenPaymentPlan: boolean = true;
  paymentStatus = PaymentStatus;

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
    this.bookingService.bookingId = this.bookingId;
  }

  get showDateTimeEditPopup() {
    return this.bookingService.showDateTimeEditPopup;
  }

  get isDataLoading() {
    return this.commonService.isDataLoading;
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

  get selectedPaymentPercentage(): number {
    return this.selectedPaymentPlan === PaymentOption.Advanced ? 20 : 100;
  }

  // setPaymentPlan(plan: 'advance' | 'full', isChecked: boolean): void {
  //   if (isChecked) {
  //     this.selectedPaymentPlan = plan;
  //     return;
  //   }

  //   this.selectedPaymentPlan = plan === 'advance' ? 'full' : 'advance';
  // }

  setPaymentPlan(plan: any, isChecked: boolean): void {
    if (isChecked) {
      this.selectedPaymentPlan = plan;
      this.calculatePaymentDetails();
      this.updatePaymentOption();
      return;
    }
    this.selectedPaymentPlan = plan === this.paymentOption.Advanced ? this.paymentOption.Full : this.paymentOption.Advanced;
    this.calculatePaymentDetails();
    this.updatePaymentOption();
  }

  getBookingDetailsById() {
    this.bookingService.getBookingDetailsById(this.bookingId).then((res) => {
      this.bookingData = res.data() as BookingVM;
      if (this.bookingData.status == BookingStatus.InProgress || this.bookingData.paymentStatus == PaymentStatus.PartiallyPaid) {
        this.isHideConfirmButton = false;
      }
      this.selectedPaymentPlan = this.bookingData.paymentOption;
      if (this.bookingData.paymentStatus == PaymentStatus.NotPaid) {
        this.isHiddenPaymentPlan = false;
      }
      this.calculatePaymentDetails();
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
      price: this.payableAmount,
      qty: 1
    });

    this.checkoutService.onProceedToPay(products, this.bookingId);
  }

  updatePaymentOption() {
    this.commonService.isDataLoading = true;
    this.bookingService.updatePaymentOption(this.bookingId, this.selectedPaymentPlan).then(() => {
      this.commonService.isDataLoading = false;
    }).catch((error) => {
      console.error(error);
      this.commonService.isDataLoading = false;
    });
  }

  calculatePaymentDetails() {
    this.totalAmount = this.bookingData.totalPrice;
    this.advancedAmount = Number((this.totalAmount * (this.selectedPaymentPercentage / 100)).toFixed(2));
    this.remainingAmount = Number((this.totalAmount - this.advancedAmount).toFixed(2));
    this.payableAmount = this.bookingData.paymentStatus == PaymentStatus.PartiallyPaid ? this.remainingAmount : this.advancedAmount;
  }

  onCloseDateTimePopup() {
    this.bookingService.showDateTimeEditPopup = false;
  }

  refreshBookingData() {
    this.getBookingDetailsById();
  }
}
