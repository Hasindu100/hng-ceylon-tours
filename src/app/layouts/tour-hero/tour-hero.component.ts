import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import flatpickr from 'flatpickr';
import { LocationVM } from 'src/app/models/tour';
import { TourDetails } from 'src/app/models/tourDetails';
import { CommonService } from 'src/app/services/common.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-tour-hero',
  templateUrl: './tour-hero.component.html',
  styleUrls: ['./tour-hero.component.scss']
})
export class TourHeroComponent {
  searchForm: FormGroup;
  activeTab: string = 'airportpickup';
  guestCount: number = 1;
  locationData: any[] = [];

  vehicleTypes = [
    { vehicleTypeId: 1, vehicleTypeName: 'Car', image: 'assets/images/vehicle/car.png'},
    { vehicleTypeId: 2, vehicleTypeName: 'Mini Car', image: 'assets/images/vehicle/mini-car.png'},
    { vehicleTypeId: 3, vehicleTypeName: 'Van', image: 'assets/images/vehicle/van.png'},
    { vehicleTypeId: 4, vehicleTypeName: 'Mini Van', image: 'assets/images/vehicle/mini-van.png'},
  ]

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
      pickupLocation: ['0', [Validators.required, Validators.min(1)]],
      destination: ['0', [Validators.required, Validators.min(1)]],
      pickupDate: ['', Validators.required],
      pickupTime: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]]
    });
  }

  get selectedVehicleType() {
    return this.commonService.selectedVehicleTypeId;
  }

  ngOnInit(): void {
    // Set default dates to today
    const today = new Date().toISOString().split('T')[0];
    this.searchForm.patchValue({
      pickupDate: today
    });
    this.getLocationData();
  }

  ngAfterViewInit(): void {
    flatpickr('#pickupDate', {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'Y-m-d',
      defaultDate: new Date(),
      minDate: 'today',
    });
  }

  setSearchFormData() {
    var searchFormSession = sessionStorage.getItem('tourDetails');
    if (searchFormSession) {
      let searchDetails: TourDetails = JSON.parse(searchFormSession);
      this.searchForm.patchValue({
        pickupLocation: this.locationData.find(loc => loc.locationName === searchDetails.pickupLocation)?.id || '0',
        destination: this.locationData.find(loc => loc.locationName === searchDetails.dropLocation)?.id || '0',
        pickupDate: searchDetails.pickupDate,
        pickupTime: searchDetails.pickupTime,
        guests: searchDetails.noOfGuests
      });
      this.commonService.selectedVehicleTypeId = searchDetails.vehicleTypeId;
      this.commonService.selectedVehicleTypeName = searchDetails.vehicleTypeName;
      this.guestCount = searchDetails.noOfGuests || 1;

      this.onSearchTourDetails();
    }
  }

  getLocationData() {
    this.locationService.loadLocationData().subscribe(data => {
      console.log('Location Data:', data);
      this.locationData = data;
      this.setSearchFormData();
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
        pickupDate: this.PickupDate?.value,
        pickupTime: this.PickupTime?.value,
        noOfGuests: this.searchForm.value.guests,
        vehicleTypeId: this.commonService.selectedVehicleTypeId,
        vehicleTypeName: this.commonService.selectedVehicleTypeName
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

  onSelectVehicleType(vehicleTypeId: number,  vehicleTypeName: string) {
    this.commonService.selectedVehicleTypeId = vehicleTypeId;
    this.commonService.selectedVehicleTypeName = vehicleTypeName;
  }
}
