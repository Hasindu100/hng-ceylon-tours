import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { serverTimestamp } from '@angular/fire/firestore';
import { FormsModule, NgForm } from '@angular/forms';
import flatpickr from 'flatpickr';
import { BookingVM } from 'src/app/models/BookingVM';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-date-time',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './date-time.component.html',
  styleUrl: './date-time.component.scss',
})
export class DateTimeComponent implements OnInit, AfterViewInit, OnChanges {
  showPopup = false;
  pickupDate: any = '';
  pickupTime: any;
  private datePickerInstance: any;

  @Input('bookingData') bookingData!: BookingVM;
  @Output() closeDateTimePopup: EventEmitter<void> = new EventEmitter<void>();
  @Output() onRefreshBookingData: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('dateTimeForm') dateTimeForm?: NgForm;

  get bookingId() {
    return this.bookingService.bookingId;
  }

  constructor(private bookingService: BookingService,
    
    private toastrService: ToastrService,
  @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.setPickupDataFromBooking();
  }

  ngAfterViewInit(): void {
    this.setPickupDataFromBooking();

    if (isPlatformBrowser(this.platformId)) {
      this.datePickerInstance = flatpickr('#pickupDate', {
        altInput: true,
        altFormat: 'F j, Y',
        dateFormat: 'Y-m-d',
        defaultDate: this.pickupDate || 'today',
        minDate: 'today',
        allowInvalidPreload: true,
        onChange: (_selectedDates: Date[], dateStr: string) => {
          this.pickupDate = dateStr;
        }
      });

      //this.syncDatePickerDisplay();
    }
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.setPickupDataFromBooking();

    //this.syncDatePickerDisplay();
  }

  private setPickupDataFromBooking(): void {
    if (this.bookingData) {
      const normalizedDate = this.toInputDate(this.bookingData.date);
      this.pickupDate = normalizedDate || this.pickupDate;
      this.pickupTime = this.bookingData.time || this.pickupTime;
    }
  }

  private syncDatePickerDisplay(): void {
    if (!this.datePickerInstance || !this.pickupDate) {
      return;
    }

    const normalizedDate = this.toInputDate(this.pickupDate);
    if (!normalizedDate) {
      return;
    }

    this.pickupDate = normalizedDate;

    if (this.isBeforeToday(normalizedDate)) {
      // Preserve historical booking date in the field while still restricting new picks to today+.
      this.datePickerInstance.input.value = normalizedDate;
      if (this.datePickerInstance.altInput) {
        const historicalDate = new Date(`${normalizedDate}T00:00:00`);
        this.datePickerInstance.altInput.value = this.datePickerInstance.formatDate(historicalDate, 'F j, Y');
      }
      return;
    }

    this.datePickerInstance.setDate(normalizedDate, false, 'Y-m-d');
  }

  private isBeforeToday(dateStr: string): boolean {
    const today = this.toInputDate(new Date());
    return !!today && dateStr < today;
  }

  private toInputDate(value: any): string {
    if (!value) {
      return '';
    }

    if (typeof value === 'string') {
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return value;
      }

      const parsed = new Date(value);
      if (!isNaN(parsed.getTime())) {
        return this.formatDate(parsed);
      }
      return '';
    }

    if (value instanceof Date) {
      return this.formatDate(value);
    }

    if (typeof value?.toDate === 'function') {
      const parsed = value.toDate();
      if (parsed instanceof Date && !isNaN(parsed.getTime())) {
        return this.formatDate(parsed);
      }
    }

    return '';
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  saveChanges() {
    if (this.dateTimeForm?.invalid) {
      return;
    }

    let pickupData = {
      date: this.pickupDate,
      time: this.pickupTime,
      updatedAt: serverTimestamp()
    };
    this.bookingService.updatePickupDateAndTime(this.bookingId, pickupData).then(() => {
      this.toastrService.success('Pickup date and time updated successfully.');
      this.onRefreshBookingData.emit();
      this.closePopup();
    });
  }

  closePopup() {
    this.showPopup = false;
    this.closeDateTimePopup.emit();
  }
}
