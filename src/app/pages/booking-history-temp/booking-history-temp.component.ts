import { Component } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingVM } from 'src/app/models/BookingVM';
import { BookingService } from 'src/app/services/booking.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-booking-history-temp',
  templateUrl: './booking-history-temp.component.html',
  styleUrls: ['./booking-history-temp.component.scss']
})
export class BookingHistoryTempComponent {
  bookings: Booking[] = [
      {
        id: 1,
        bookingId: 'TRV-20241',
        destination: 'Santorini Sunset Escape',
        country: 'Greece, Europe',
        imageUrl: 'assets/images/tourType/type1.png',
        tourType: 'Island Retreat',
        status: 'completed',
        startDate: new Date('2024-06-10'),
        endDate: new Date('2024-06-17'),
        duration: 7,
        travelers: 2,
        hotel: 'Canaves Oia',
        totalPrice: 3480,
        rating: 5,
        review: 'Absolutely magical experience!'
      },
      {
        id: 2,
        bookingId: 'TRV-20389',
        destination: 'Bali Spirit Journey',
        country: 'Bali, Indonesia',
        imageUrl: 'assets/images/tourType/type2.png',
        tourType: 'Cultural Tour',
        status: 'inprogress',
        startDate: new Date('2025-03-01'),
        endDate: new Date('2025-03-14'),
        duration: 14,
        travelers: 1,
        hotel: 'Alaya Resort Ubud',
        totalPrice: 2950,
        progress: 55
      },
      {
        id: 3,
        bookingId: 'TRV-20412',
        destination: 'Patagonia Wild Trek',
        country: 'Argentina & Chile',
        imageUrl: 'assets/images/tourType/type3.png',
        tourType: 'Adventure',
        status: 'failed',
        startDate: new Date('2025-02-15'),
        endDate: new Date('2025-02-25'),
        duration: 10,
        travelers: 3,
        hotel: 'Explora Patagonia',
        totalPrice: 7200,
        failReason: 'Payment declined — please update your payment method to retry.'
      },
      {
        id: 4,
        bookingId: 'TRV-19988',
        destination: 'Tokyo Neon & Tradition',
        country: 'Japan, Asia',
        imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80',
        tourType: 'City Explorer',
        status: 'completed',
        startDate: new Date('2024-11-03'),
        endDate: new Date('2024-11-12'),
        duration: 9,
        travelers: 2,
        hotel: 'Aman Tokyo',
        totalPrice: 5600,
        rating: 4,
        review: 'Stunning city, incredible food tour.'
      },
      {
        id: 5,
        bookingId: 'TRV-20501',
        destination: 'Safari Serengeti',
        country: 'Tanzania, Africa',
        imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80',
        tourType: 'Wildlife Safari',
        status: 'inprogress',
        startDate: new Date('2025-03-05'),
        endDate: new Date('2025-03-12'),
        duration: 7,
        travelers: 4,
        hotel: 'Four Seasons Safari Lodge',
        totalPrice: 12400,
        progress: 28
      },
      {
        id: 6,
        bookingId: 'TRV-19750',
        destination: 'Amalfi Coast Drive',
        country: 'Italy, Europe',
        imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&q=80',
        tourType: 'Scenic Drive',
        status: 'completed',
        startDate: new Date('2024-09-14'),
        endDate: new Date('2024-09-21'),
        duration: 7,
        travelers: 2,
        hotel: 'Hotel Santa Caterina',
        totalPrice: 4100
      },
      {
        id: 7,
        bookingId: 'TRV-20333',
        destination: 'Maldives Overwater',
        country: 'Maldives, Indian Ocean',
        imageUrl: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80',
        tourType: 'Luxury Beach',
        status: 'failed',
        startDate: new Date('2025-01-20'),
        endDate: new Date('2025-01-27'),
        duration: 7,
        travelers: 2,
        hotel: 'Gili Lankanfushi',
        totalPrice: 8900,
        failReason: 'Flight cancellation due to weather — full refund processed.'
      }
    ];
  
    filteredBookings: Booking[] = [];
    activeFilter: string = 'all';
    searchQuery: string = '';
    sortOrder: string = 'newest';
    currentPage: number = 1;
    itemsPerPage: number = 5;
  
    bookingDataList: BookingVM[] = [];
  
    user: User = this.activatedRoute.snapshot.data['user'];
  
    constructor(private router: Router,
      private activatedRoute: ActivatedRoute,
      private commonService: CommonService,
      private bookingService: BookingService) {}
  
    ngOnInit(): void {
      this.applyFilters();
      this.getBookingDetailsByUserId();
    }
  
    get totalBookings(): number {
      return this.bookings.length;
    }
  
    get completedCount(): number {
      return this.bookings.filter(b => b.status === 'completed').length;
    }
  
    get inProgressCount(): number {
      return this.bookings.filter(b => b.status === 'inprogress').length;
    }
  
    get failedCount(): number {
      return this.bookings.filter(b => b.status === 'failed').length;
    }
  
    get totalSpent(): number {
      return this.bookings
        .filter(b => b.status === 'completed')
        .reduce((sum, b) => sum + b.totalPrice, 0);
    }
  
    get totalPages(): number {
      return Math.ceil(this.filteredBookings.length / this.itemsPerPage);
    }
  
    get pages(): number[] {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  
    setFilter(filter: string): void {
      this.activeFilter = filter;
      this.currentPage = 1;
      this.applyFilters();
    }
  
    onSearch(): void {
      this.currentPage = 1;
      this.applyFilters();
    }
  
    onSort(): void {
      this.applyFilters();
    }
  
    applyFilters(): void {
      let result = [...this.bookings];
  
      // Status filter
      if (this.activeFilter !== 'all') {
        result = result.filter(b => b.status === this.activeFilter);
      }
  
      // Search filter
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase();
        result = result.filter(b =>
          b.destination.toLowerCase().includes(q) ||
          b.country.toLowerCase().includes(q) ||
          b.bookingId.toLowerCase().includes(q) ||
          b.tourType.toLowerCase().includes(q)
        );
      }
  
      // Sort
      switch (this.sortOrder) {
        case 'newest':
          result.sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
          break;
        case 'oldest':
          result.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
          break;
        case 'price-high':
          result.sort((a, b) => b.totalPrice - a.totalPrice);
          break;
        case 'price-low':
          result.sort((a, b) => a.totalPrice - b.totalPrice);
          break;
      }
  
      this.filteredBookings = result;
    }
  
    changePage(page: number): void {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  
    viewDetails(booking: Booking): void {
      this.router.navigate(['/bookings', booking.bookingId]);
    }
  
    downloadInvoice(booking: Booking): void {
      console.log('Downloading invoice for:', booking.bookingId);
      // Implement invoice download logic
    }
  
    rebookTour(booking: Booking): void {
      this.router.navigate(['/tours', booking.id]);
    }
  
    retryBooking(booking: Booking): void {
      this.router.navigate(['/checkout', booking.bookingId, 'retry']);
    }
  
    trackJourney(booking: Booking): void {
      this.router.navigate(['/track', booking.bookingId]);
    }
  
    openRating(booking: Booking): void {
      console.log('Opening rating modal for:', booking.bookingId);
      // Implement rating modal logic (e.g., open dialog component)
    }
  
    getBookingDetailsByUserId() {
      const userId = this.user.uid;
      this.bookingService.getBookingDetailsByUserId(userId).subscribe((res: any) => {
        this.bookingDataList = res;
        var p = res;
      });
    }
}

export interface Booking {
  id: number;
  bookingId: string;
  destination: string;
  country: string;
  imageUrl: string;
  tourType: string;
  status: 'completed' | 'inprogress' | 'failed';
  startDate: Date;
  endDate: Date;
  duration: number;
  travelers: number;
  hotel: string;
  totalPrice: number;
  progress?: number;
  failReason?: string;
  rating?: number;
  review?: string;
}
