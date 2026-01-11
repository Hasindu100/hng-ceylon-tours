import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationVM } from 'src/app/models/tour';
import { CommonService } from 'src/app/services/common.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-tour-hero',
  templateUrl: './tour-hero.component.html',
  styleUrls: ['./tour-hero.component.scss']
})
export class TourHeroComponent {
  searchForm: FormGroup;
  activeTab: string = 'tour';
  guestCount: number = 1;
  locationData: any[] = [];

  features = [
    { icon: '✓', text: 'Private Taxi' },
    { icon: '✓', text: 'Custom Tours' },
    { icon: '✓', text: 'Local Guide' }
  ];

  get PickupLocation() {
    return this.searchForm.get('pickupLocation');
  }
  get Destination() { 
    return this.searchForm.get('destination');
  }
  get PickupDate() {
    return this.searchForm.get('pickupDate');
  }
  get PickupTime() {
    return this.searchForm.get('pickupTime');
  }
  get Guests() {
    return this.searchForm.get('guests');
  }

  constructor(private fb: FormBuilder,
    private locationService: LocationService,
    private commonService: CommonService) {
    this.searchForm = this.fb.group({
      pickupLocation: ['0', Validators.required],
      destination: ['0', Validators.required],
      pickupDate: ['', Validators.required],
      pickupTime: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Set default dates to today
    const today = new Date().toISOString().split('T')[0];
    this.searchForm.patchValue({
      pickupDate: today,
      pickupTime: today.concat('T09:00')
    });
    this.getLocationData();
  }

  getLocationData() {
    this.locationService.loadLocationData().subscribe(data => {
      console.log('Location Data:', data);
      this.locationData = data;
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  addGuest(): void {
    this.guestCount++;
    this.searchForm.patchValue({ guests: this.guestCount });
  }

  removeGuest(): void {
    if (this.guestCount > 1) {
      this.guestCount--;
      this.searchForm.patchValue({ guests: this.guestCount });
    }
  }

  onSearchTourDetails(): void {
    if (this.searchForm.valid) {
      console.log('Search params:', this.searchForm.value);
      // Implement your search logic here
      let pickupLocation = this.locationData.find(loc => loc.id === this.PickupLocation?.value);
      let destination = this.locationData.find(loc => loc.id === this.Destination?.value);
      let locationDetails: LocationVM = {
        pickupLocation: pickupLocation?.locationName || '',
        destination: destination?.locationName || '',
        pickupLonLang: [(pickupLocation?.longitude || 0), (pickupLocation?.latitude || 0)],
        destinationLonLang: [(destination?.longitude || 0), (destination?.latitude || 0)],
        pickupDate: new Date(this.PickupDate?.value),
        pickupTime: new Date(this.PickupTime?.value),
        noOfGuests: this.searchForm.value.guests
      };
      console.log('Location Details:', locationDetails);
      // You can use a service to share this data with other components
      this.commonService.loadTourDetails$.next(locationDetails);
    }
  }

  planJourney(): void {
    console.log('Plan your journey clicked');
    // Implement navigation or modal logic
  }

  previousSlide(): void {
    console.log('Previous slide');
    // Implement carousel logic
  }

  nextSlide(): void {
    console.log('Next slide');
    // Implement carousel logic
  }
}
