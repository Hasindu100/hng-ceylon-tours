import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import flatpickr from 'flatpickr';
import { PersonalInfo } from 'src/app/models/personalInfo';
import { SearchFormData } from 'src/app/models/searchFormData';
import { LocationVM } from 'src/app/models/tour';
import { TourDetails } from 'src/app/models/tourDetails';
import { TourDetails2 } from 'src/app/models/tourDetails2';
import { RouteResult } from 'src/app/pages/tour-details/tour-details.component';
import { CommonService } from 'src/app/services/common.service';
import { LocationService } from 'src/app/services/location.service';
import { ToursService } from 'src/app/services/tours.service';
import { BookingStatus, VehicleType } from 'src/app/shared/enums';
import { Auth, AuthErrorCodes, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { VehicleTypeService } from 'src/app/services/vehicle-type.service';
import { BookingVM, VehicleTypeVM } from 'src/app/models/BookingVM';
import { serverTimestamp } from '@angular/fire/firestore';
import { firstValueFrom, map, take, timeout } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { HttpClient } from '@angular/common/http';
import { EmailService } from 'src/app/services/email.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { animate, style, transition, trigger } from '@angular/animations';


export const slideLeft = trigger('slideLeft', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
  ])
]);

export const slideRight = trigger('slideRight', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
  ])
]);


@Component({
  selector: 'app-tour-hero2',
  templateUrl: './tour-hero2.component.html',
  styleUrls: ['./tour-hero2.component.scss'],
  animations: [slideLeft, slideRight]
})
export class TourHero2Component {
  pickupSelectedVehicle: number = VehicleType.Car;
  pickupSelectedVehicleType: any;
  vehicleTypes: VehicleTypeVM[] = [];
  // vehicleTypes: VehicleTypeVM[] = [
  //   { id: VehicleType.Car, name: 'Car', image: 'assets/images/vehicle/car.png' },
  //   { id: VehicleType.MiniCar, name: 'Mini Car', image: 'assets/images/vehicle/mini-car.png' },
  //   { id: VehicleType.Van, name: 'Van', image: 'assets/images/vehicle/van.png' },
  //   { id: VehicleType.MiniVan, name: 'Mini Van', image: 'assets/images/vehicle/mini-van.png' },
  //   { id: VehicleType.Bus, name: 'Bus', image: 'assets/images/vehicle/mini-van.png' }
  // ];

  vehicleName: string = 'Suzuki Alto';
  estimatedPrice: string = '$ 18,630.60';
  passengers: number = 3;

  pickupSearchForm!: FormGroup;
  airportPickupPersonalInfoForm!: FormGroup;
  activeTab: string = 'airportpickup';
  guestCount: number = 1;
  locationData: any[] = [];
  countryList: any[] = [];

  airportPickupStep: number = 1;
  isLoading: boolean = false;
  apiKey: string = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImQyYmRkMTlhYTE4NTRhYmQ5NTlhMDNjMjUxM2EyNGNkIiwiaCI6Im11cm11cjY0In0';

  pickupLocation: string = '';
  destination: string = '';
  pickupLonLang: any;
  destinationLonLang: any;
  distanceKm: number | null = null;
  priceRatePerKM: number = 1;
  totalTourPrice: number = 0;
  googleAuthProvider = new GoogleAuthProvider();
  //auth instance
  auth = inject(Auth);
  errorMessage: string = '';

  pickupSearchFormData: TourDetails2 = {
    pickupLocation: '',
    destination: '',
    pickupLonLang: undefined,
    destinationLonLang: undefined,
    distanceKm: 0,
    priceRatePerKM: 0,
    totalTourPrice: 0,
    date: new Date(),
    time: new Date(),
    vehicleTypeId: 0,
    vehicleType: '',
    adultCount: 0,
    childCount: 0,
    flightNumber: '',
    noOfDays: 0
  }

  tripData = {
    vehicleType: 'Budget',
    vehicleName: 'Suzuki Alto',
    price: 'Est.LKR 43,571.45',
    pickup: {
      label: 'Pick',
      location: 'BIA Arrival Terminal, Katu...'
    },
    drop: {
      label: 'Drop',
      location: 'Ella, Sri Lanka'
    }
  };
  

  get PickupLocation() {
    return this.pickupSearchForm.get('pickupLocation');
  }
  get Destination() { 
    return this.pickupSearchForm.get('destination');
  }
  get PickupDate() {
    return this.pickupSearchForm.get('pickupDate');
  }
  get PickupTime() {
    return this.pickupSearchForm.get('pickupTime');
  }
  get Guests() {
    return this.pickupSearchForm.get('guests');
  }

  constructor(private fb: FormBuilder,
    private locationService: LocationService,
    private commonService: CommonService,
    private tourService: ToursService,
    private vehicleTypeService: VehicleTypeService,
    private bookingService: BookingService,
    private router: Router,
    private http: HttpClient,
    private emailService: EmailService,
    private checkoutService: CheckoutService) {
    this.pickupSearchForm = this.fb.group({
      pickupLocation: ['0', [Validators.required, Validators.min(1)]],
      destination: ['0', [Validators.required, Validators.min(1)]],
      pickupDate: ['', Validators.required],
      pickupTime: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]]
    });

    this.airportPickupPersonalInfoForm = this.fb.group({
      flightNumber: ['', Validators.required],
      country: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adultCount: ['1', [Validators.required, Validators.min(1)]],
      childCount: ['0', [Validators.required, Validators.min(0)]]
    })
  }

  get selectedVehicleType() {
    return this.commonService.selectedVehicleTypeId;
  }

  get user() {
    return this.commonService.user;
  }

  get isDataLoading() {
    return this.commonService.isDataLoading;
  }

  ngOnInit(): void {
    // Set default dates to today
    const today = new Date().toISOString().split('T')[0];
    this.pickupSearchForm.patchValue({
      pickupDate: today
    });
    var p = this.user;
    this.getVehicleTypesData();
    this.getLocationData();
    this.getCountryList();
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
      this.pickupSearchForm.patchValue({
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
    this.setActiveTab(this.activeTab);
  }

  getVehicleTypesData() {
    this.vehicleTypeService.getVehicleTypes().subscribe((res: any) => {
      this.vehicleTypes = res;
    })
  }
  
  getLocationData() {
    this.locationService.loadLocationData().subscribe((data: any) => {
      console.log('Location Data:', data);
      this.locationData = data;
      this.setSearchFormData();
    });
  }

  getCountryList() {
    this.commonService.getCountryList().subscribe((data: any) => {
      this.countryList = data;
    });
  }
  
  setActiveTab(tab: string): void {
    this.activeTab = tab;
    var airportLocationData = this.locationData.find((x: any) => x.locationName.includes('Colombo Airport'));
    if (airportLocationData) {
      if (tab === 'airportpickup') {
        this.pickupSearchForm.get('pickupLocation')?.setValue(airportLocationData.id);
        this.pickupSearchForm.get('pickupLocation')?.disable();
        this.pickupSearchForm.get('destination')?.enable();
      }
      else if (tab === 'airportdrop') {
        this.pickupSearchForm.get('destination')?.setValue(airportLocationData.id);
        this.pickupSearchForm.get('pickupLocation')?.enable();
        this.pickupSearchForm.get('destination')?.disable();
      }
      else {
        this.pickupSearchForm.get('pickupLocation')?.enable();
        this.pickupSearchForm.get('destination')?.enable();
      }
    }
  }
  
  onSearchTourDetails(): void {
    if (this.pickupSearchForm.valid) {
      this.pickupSearchFormData.vehicleTypeId = this.pickupSelectedVehicle;
      console.log(this.pickupSearchFormData);
    }
  }

  planJourney(): void {
    console.log('Plan your journey clicked');
    // Implement navigation or modal logic
  }
  
  onSelectVehicleType(vehicleTypeId: number,  vehicleTypeName: string) {
    this.commonService.selectedVehicleTypeId = vehicleTypeId;
    this.commonService.selectedVehicleTypeName = vehicleTypeName;
  }

  selectVehicle(vehicleTypeId: number): void {
    this.pickupSelectedVehicleType = this.vehicleTypes.find((x: VehicleTypeVM) => x.vehicleTypeId == vehicleTypeId);
    this.pickupSelectedVehicle = vehicleTypeId;
    this.totalTourPrice = this.calculatePricePerKm(vehicleTypeId);
  }

  nextAirportPickupStep(): void {
    this.airportPickupStep++;
  }

  previousAirportPickupStep(): void {
    if (this.airportPickupStep > 1) {
      this.airportPickupStep--;
    }
  }

  async onChangeAirportPickupLocationChange() {
    let pickupLocation = this.locationData.find(loc => loc.id === this.PickupLocation?.value);
    let destination = this.locationData.find(loc => loc.id === this.Destination?.value);
    this.pickupLocation = pickupLocation?.locationName || '';
    this.destination = destination?.locationName || '';
    this.pickupLonLang = [(pickupLocation?.longitude || 0), (pickupLocation?.latitude || 0)];
    this.destinationLonLang = [(destination?.longitude || 0), (destination?.latitude || 0)];

    this.isLoading = true;
    const { latLngs, distanceKm, durationMin } = await this.routeDriving(this.pickupLonLang, this.destinationLonLang);
    this.distanceKm = distanceKm;
    this.totalTourPrice =  this.calculatePricePerKm(this.pickupSelectedVehicle);

    this.pickupSearchFormData.pickupLocation = pickupLocation?.locationName || '';
    this.pickupSearchFormData.destination = destination?.locationName || '';
    this.pickupSearchFormData.pickupLonLang = [(pickupLocation?.longitude || 0), (pickupLocation?.latitude || 0)];
    this.pickupSearchFormData.destinationLonLang = [(destination?.longitude || 0), (destination?.latitude || 0)];
    this.pickupSearchFormData.distanceKm = distanceKm;
    this.pickupSearchFormData.totalTourPrice = this.calculatePricePerKm(this.pickupSelectedVehicle);
  }

 pickupDetailsOnSubmit() {
    if (this.user == undefined || this.user == null) {
      signInWithPopup(this.auth, this.googleAuthProvider)
      .then((response) => {
        this.loadData();
      })
      .catch((error => {
        console.error('error:', error);
        this.errorMessage = "Somthing went wrong. Please try again.";
      }));
    }
    else {
      this.submitPickupData();
    }
  }

  async loadData() {
    //this.commonService.loadUserData.next(null)
    
    const userData = await firstValueFrom(this.commonService.loadUserData$.pipe(
      take(1),
      map(() => {
        
      })
    ));

    setTimeout(() => {
      this.submitPickupData();
    }, 1000);
  }
  submitPickupData() {
    var countryCode = this.airportPickupPersonalInfoForm.controls['country'].value;
    var countryDetails = this.countryList.find((x: any) => x.iso2 == countryCode);
    if (this.pickupSearchForm.valid && this.airportPickupPersonalInfoForm.valid) {
      var personalInfo: PersonalInfo = {
        firstName: this.airportPickupPersonalInfoForm.controls['firstName'].value,
        lastName: this.airportPickupPersonalInfoForm.controls['lastName'].value,
        email: this.airportPickupPersonalInfoForm.controls['email'].value,
        mobileNumber: this.airportPickupPersonalInfoForm.controls['mobileNumber'].value,
        country: countryDetails?.name,
        adultCount: this.airportPickupPersonalInfoForm.controls['adultCount'].value,
        childCount: this.airportPickupPersonalInfoForm.controls['childCount'].value,
        flightNumber: this.airportPickupPersonalInfoForm.controls['flightNumber'].value
      }

      this.pickupSearchFormData.date = this.PickupDate?.value;
      this.pickupSearchFormData.time = this.PickupTime?.value;
      this.pickupSearchFormData.vehicleTypeId = this.pickupSelectedVehicle;
      this.pickupSearchFormData.vehicleType = this.commonService.selectedVehicleTypeName;
      this.pickupSearchFormData.adultCount = this.airportPickupPersonalInfoForm.controls['adultCount'].value;
      this.pickupSearchFormData.childCount = this.airportPickupPersonalInfoForm.controls['childCount'].value;
      this.pickupSearchFormData.flightNumber = this.airportPickupPersonalInfoForm.controls['flightNumber'].value;

      var tourData = {
        'tourInfo': this.pickupSearchFormData,
        'personalInfo': personalInfo
      }

      this.tourService.airportPickupTourInfo = tourData;
      localStorage.setItem('tourData', JSON.stringify(this.pickupSearchFormData));
      localStorage.setItem('userData', JSON.stringify(personalInfo));

      let pickupLocation = this.locationData.find(loc => loc.id === this.PickupLocation?.value);
      let destination = this.locationData.find(loc => loc.id === this.Destination?.value);

      var bookingData: BookingVM = {
        userId: this.user.uid,
        pickup: {
          address: this.pickupSearchFormData.pickupLocation,
          lat: (pickupLocation?.latitude || 0),
          lng: (pickupLocation?.longitude || 0)
        },
        dropoff: {
          address: this.pickupSearchFormData.destination,
          lat: (destination?.latitude || 0),
          lng: (destination?.longitude || 0)
        },
        distanceKm: this.pickupSearchFormData.distanceKm,
        duration: null,
        totalPrice: this.pickupSearchFormData.totalTourPrice,
        date: this.pickupSearchFormData.date,
        time: this.pickupSearchFormData.time,
        vehicleTypeRef: this.pickupSelectedVehicleType.id,
        vehicleType: this.pickupSelectedVehicleType,
        adultCount: this.pickupSearchFormData.adultCount,
        childCount: this.pickupSearchFormData.childCount,
        flightNumber: this.pickupSearchFormData.flightNumber,
        email: personalInfo.email,
        mobileNumber: personalInfo.mobileNumber,
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
        country: personalInfo.country,
        status: BookingStatus.InProgress,
        tourType: {
          id: 1,
          name: 'Airport Pickup'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }

      this.bookingService.saveBooking(bookingData).then((docRef) => {
        // Email Logic
        const userEmail = this.commonService.user.email;
        if (userEmail != null) {
          this.emailService.sendEmail(userEmail).subscribe({
            next: (res) => {
              this.router.navigate([`/checkout/${docRef.id}`]);
            },
            error: (err) => {

            }
          });
        }
        else {
          this.router.navigate([`/checkout/${docRef.id}`]);
        }        
      }).catch((error) => {
        console.log("Something went wrong!");
      });
    }
  }

  async routeDriving(start: [number, number], end: [number, number]): Promise<RouteResult> {
    const body = {
        coordinates: [start, end],
        // profile can be 'driving-car', 'driving-hgv', 'cycling-regular', 'foot-walking', etc.
        format: 'json'
      };
      const res = await fetch('https://api.openrouteservice.org/v2/directions/driving-car?api_key=eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImQyYmRkMTlhYTE4NTRhYmQ5NTlhMDNjMjUxM2EyNGNkIiwiaCI6Im11cm11cjY0In0=&start=80.497346,5.941968&end=6.9270786,79.861243', {
        method: 'POST',
        headers: {
          'Authorization': this.apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

    if (!res.ok) {
      throw new Error(`ORS error ${res.status}: ${await res.text()}`);
    }

    const json = await res.json();
    const route = json?.routes?.[0];
    if (!route) throw new Error('No route found');

    const km = (route.summary?.distance ?? 0) / 1000;
    const min = (route.summary?.duration ?? 0) / 60;
    const latLngs: [number, number][] = [start, end];
    this.isLoading = false;
    return { distanceKm: km, durationMin: min, latLngs };
  }

  calculatePricePerKm(vehicleTypeId: number): any {
    switch(vehicleTypeId) {
      case 1:
        this.priceRatePerKM = 0.4;
        break;
      case 2:
        this.priceRatePerKM = 0.3;
        break;
      case 3:
        this.priceRatePerKM = 0.6;
        break;
      case 4:
        this.priceRatePerKM = 0.5;
        break;
      default:
        break;
    }
    if (this.distanceKm) {
      const pricePerKm = this.distanceKm * this.priceRatePerKM;
      return pricePerKm.toFixed(2);
    }
    return 0;
  }

  getSelectedVehicleType() {
    var vehicleType = '';
    switch (this.pickupSelectedVehicle) {
      case VehicleType.Car:
        vehicleType = 'Car';
        break;
      case VehicleType.MiniCar:
        vehicleType = 'Mini Car';
        break;
      case VehicleType.Van:
        vehicleType = 'Van';
        break;
      case VehicleType.MiniVan:
        vehicleType = 'Mini Van';
        break;
      case VehicleType.Bus:
        vehicleType = 'Bus';
        break;
      default:
        break;
    }
    return vehicleType;
  }

  getPassengersCount() {
    var passengerCount = 1;
    switch (this.pickupSelectedVehicle) {
      case VehicleType.Car:
        passengerCount = 4;
        break;
      case VehicleType.MiniCar:
        passengerCount = 3;
        break;
      case VehicleType.Van:
        passengerCount = 12;
        break;
      case VehicleType.MiniVan:
        passengerCount = 5;
        break;
      case VehicleType.Bus:
        passengerCount = 16;
        break;
      default:
        break;
    }
    return passengerCount;
  }

  getVehicleTypeImage(typeId: number) {
    var image = '';
    switch (typeId) {
      case VehicleType.Car:
        image = 'assets/images/vehicle/car.png';
        break;
      case VehicleType.MiniCar:
        image = 'assets/images/vehicle/mini-car.png';
        break;
      case VehicleType.Van:
        image = 'assets/images/vehicle/van.png';
        break;
      case VehicleType.MiniVan:
        image = 'assets/images/vehicle/mini-van.png';
        break;
      case VehicleType.Bus:
        image = 'assets/images/vehicle/van.png';
        break;
      default:
        break;
    }
    return image;
  }

  onSignInWithGoogle() {
    signInWithPopup(this.auth, this.googleAuthProvider)
    .then((response) => {
      //this.redirectToDashboardPage();
    })
    .catch((error => {
      console.error('error:', error);
      this.errorMessage = "Somthing went wrong. Please try again.";
    }))
  }
}






