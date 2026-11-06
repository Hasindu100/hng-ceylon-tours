import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookingVM } from 'src/app/models/BookingVM';
import { TourDetails } from 'src/app/models/tourDetails';
import { TourDetails2 } from 'src/app/models/tourDetails2';
import { BookingService } from 'src/app/services/booking.service';

@Component({
    selector: 'app-order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      FormsModule
    ]
})
export class OrderSummaryComponent implements OnInit {
  order = {
    title: 'From Kandy: Ella Drop Tour via Nuwara Eliya',
    image: 'https://images.unsplash.com/photo-1586339277861-b0b895343ba5?w=400&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 22,
    spotsLeft: 1,
    topRated: true,
    tourName: 'From Kandy: Ella Drop Tour via Nuwara Eliya by Tuk Tuk',
    language: 'English',
    date: 'Friday, January 23, 2026, starts at 7:30 AM',
    participants: '1 adult (Age 0 - 99)',
    freeCancellation: true,
    cancellationDeadline: 'Until 7:30 AM on January 22',
    valueRating: 4.6,
    total: 77.22
  };

  @Input() tourDetails: BookingVM | undefined;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {

  }

  editPickupDateTime() {
    this.bookingService.showDateTimeEditPopup = true;
  }

  changeDetails() {
    console.log('Change date or participants clicked');
  }

  enterPromoCode() {
    console.log('Enter promo code clicked');
  }
}
