import { Component, inject, OnInit } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, debounceTime, distinctUntilChanged, firstValueFrom, map, Observable, Subject, switchMap, take } from 'rxjs';
import { BookingVM, VehicleTypeVM } from 'src/app/models/BookingVM';
import { PersonalInfo } from 'src/app/models/personalInfo';
import { TourDetails2 } from 'src/app/models/tourDetails2';
import { RouteResult } from 'src/app/pages/tour-details/tour-details.component';
import { BookingService } from 'src/app/services/booking.service';
import { CommonService } from 'src/app/services/common.service';
import { EmailService } from 'src/app/services/email.service';
import { LocationService } from 'src/app/services/location.service';
import { ToursService } from 'src/app/services/tours.service';
import { VehicleTypeService } from 'src/app/services/vehicle-type.service';
import { BookingStatus, VehicleType } from 'src/app/shared/enums';

@Component({
  selector: 'app-airport-pickup-form',
  templateUrl: './airport-pickup-form.component.html',
  styleUrls: ['./airport-pickup-form.component.scss']
})
export class AirportPickupFormComponent implements OnInit {
  airportPickupStep: number = 1;
  pickupSearchForm!: FormGroup;
  personalInfoForm!: FormGroup;
  locationData: any[] = [];
  dropLocationData: any[] = [];
  pickupLocation: string = '';
  destination: string = '';
  pickupLonLang: any;
  destinationLonLang: any;
  distanceKm: number | null = null;
  priceRatePerKM: number = 1;
  totalTourPrice: number = 0;
  selectedVehicleTypeId: number = VehicleType.Car;
  selectedVehicleType: any;
  apiKey: string = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImQyYmRkMTlhYTE4NTRhYmQ5NTlhMDNjMjUxM2EyNGNkIiwiaCI6Im11cm11cjY0In0';
  vehicleTypes: VehicleTypeVM[] = [];
  countryList: any[] = [];
  googleAuthProvider = new GoogleAuthProvider();
  //auth instance
  auth = inject(Auth);
  errorMessage: string = '';
  showVehicleImagePopup: boolean = false;
  showMapPopup: boolean = false;
  routerData: any;
  
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

  searchInput = new Subject<string>();

  //#region search form controls
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
  //#endregion

  //#region Personal Info Form Controls
    get Country() {
      return this.personalInfoForm.get('country');
    }
    get MobileNumber() {
      return this.personalInfoForm.get('mobileNumber');
    }
    get FirstName() {
      return this.personalInfoForm.get('firstName');
    }
    get LastName() {
      return this.personalInfoForm.get('lastName');
    }
    get Email() {
      return this.personalInfoForm.get('email');
    }
    get AdultCount() {
      return this.personalInfoForm.get('adultCount');
    }
    get ChildCount() {
      return this.personalInfoForm.get('childCount');
    }
    get FlightNumber() {
      return this.personalInfoForm.get('flightNumber');
    }
    //#endregion

  get user() {
    return this.commonService.user;
  }

  constructor(private fb: FormBuilder,
    private locationService: LocationService,
    private vehicleTypeService: VehicleTypeService,
    private commonService: CommonService,
    private tourService: ToursService,
    private bookingService: BookingService,
    private emailService: EmailService,
    private router: Router) {
    this.pickupSearchForm = this.fb.group({
      pickupLocation: ['0', [Validators.required, Validators.min(1)]],
      destination: ['0', [Validators.required, Validators.min(1)]],
      pickupDate: ['', Validators.required],
      pickupTime: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]]
    });

    this.personalInfoForm = this.fb.group({
      flightNumber: ['', Validators.required],
      country: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adultCount: ['1', [Validators.required, Validators.min(1)]],
      childCount: ['0', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // Set default dates to today
    const today = new Date().toISOString().split('T')[0];
    this.pickupSearchForm.patchValue({
      pickupDate: today
    });
    this.getLocationData();
    this.getVehicleTypesData();
    this.getCountryList();

    this.searchInput.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term: string) => 
        this.locationService.searchLocations(term)
      )
    ).subscribe((res: any) => {
        var data = res?.map((feature: any) => {
        return {
          id: feature?.place_id,
          locationName: feature?.display_name,
          latitude: feature?.lat,
          longitude: feature?.lon
        }
      });
      this.dropLocationData = data;
    });
  }

  getLocationData() {
    this.locationService.loadLocationData().subscribe((data: any) => {
      this.locationData = data;
      var airportLocationData = this.locationData.find((x: any) => x.locationName.includes('Colombo Airport'));
      this.pickupSearchForm.get('pickupLocation')?.setValue(airportLocationData.id);
      this.pickupSearchForm.get('pickupLocation')?.disable();
      this.pickupSearchForm.get('destination')?.enable();
    });
  }

  getVehicleTypesData() {
    this.vehicleTypeService.getVehicleTypes().subscribe((res: any) => {
      this.vehicleTypes = res;
      this.selectedVehicleType = this.vehicleTypes.find((x: VehicleTypeVM) => x.vehicleTypeId == this.selectedVehicleTypeId);
    })
  }

  getCountryList() {
    this.commonService.getCountryList().subscribe((data: any) => {
      this.countryList = data;
    });
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

  getSelectedVehicleType() {
    var vehicleType = '';
    switch (this.selectedVehicleTypeId) {
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
    switch (this.selectedVehicleTypeId) {
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

  selectVehicle(vehicleTypeId: number): void {
    this.selectedVehicleType = this.vehicleTypes.find((x: VehicleTypeVM) => x.vehicleTypeId == vehicleTypeId);
    this.selectedVehicleTypeId = vehicleTypeId;
    this.totalTourPrice = this.calculatePricePerKm(vehicleTypeId);
  }

  async onChangeAirportPickupLocationChange() {
    let pickupLocation = this.locationData.find(loc => loc.id === this.PickupLocation?.value);
    let destination = this.dropLocationData.find(loc => loc.id === this.Destination?.value);
    if (pickupLocation == undefined || pickupLocation == null || destination == undefined || destination == null) {
      return;
    }
    this.pickupLocation = pickupLocation?.locationName || '';
    this.destination = destination?.locationName || '';
    this.pickupLonLang = [(pickupLocation?.longitude || 0), (pickupLocation?.latitude || 0)];
    this.destinationLonLang = [(destination?.longitude || 0), (destination?.latitude || 0)];
    this.destinationLonLang = this.destinationLonLang.map(Number);

    this.commonService.isDataLoading = true;
    const { latLngs, distanceKm, durationMin } = await this.routeDriving2(this.pickupLonLang, this.destinationLonLang);
    this.distanceKm = distanceKm;
    this.totalTourPrice =  this.calculatePricePerKm(this.selectedVehicleTypeId);

    this.pickupSearchFormData.pickupLocation = pickupLocation?.locationName || '';
    this.pickupSearchFormData.destination = destination?.locationName || '';
    this.pickupSearchFormData.pickupLonLang = [(pickupLocation?.longitude || 0), (pickupLocation?.latitude || 0)];
    this.pickupSearchFormData.destinationLonLang = [(destination?.longitude || 0), (destination?.latitude || 0)];
    this.pickupSearchFormData.distanceKm = distanceKm;
    this.pickupSearchFormData.totalTourPrice = this.calculatePricePerKm(this.selectedVehicleTypeId);
    this.routerData = {
      'pickupLatLang': [(pickupLocation?.latitude || 0), (pickupLocation?.longitude || 0)],
      'destinationLatLang': [(destination?.latitude || 0), (destination?.longitude || 0)],
      'pickupLocation': this.pickupLocation,
      'destination': this.destination,
      'distanceKm': this.distanceKm,
    }
  }

  searchLocations(searchTerm: string) {
    // this.locationService.searchLocations(searchTerm).subscribe((res: any) => {
    //   // var data = res?.features?.map((feature: any) => {
    //   //   return {
    //   //     id: feature?.properties?.id,
    //   //     locationName: feature?.properties?.label,
    //   //     latitude: feature?.geometry?.coordinates[1],
    //   //     longitude: feature?.geometry?.coordinates[0]
    //   //   }
    //   // });

    //   // var data = res?.features
    //   // ?.map((feature: any) => {
    //   //   let displayName = feature?.properties?.label || '';
    //   //   const isAirport = displayName.toLowerCase().includes('airport');
    //   //   displayName = displayName
    //   //   .replace(', MH', '')
    //   //   .replace(', WP', '')
    //   //   .replace(', CP', '')
    //   //   .replace(', RN', '')

    //   //   return {
    //   //     id: feature?.properties?.id,
    //   //     locationName: displayName,
    //   //     latitude: feature?.geometry?.coordinates[1],
    //   //     longitude: feature?.geometry?.coordinates[0]
    //   //   }
    //   // });

    //   var data = res?.map((feature: any) => {
    //     let displayName = feature?.display_name || '';
    //     const isAirport = displayName.toLowerCase().includes('airport');
    //     displayName = displayName
    //     .replace(', MH', '')
    //     .replace(', WP', '')
    //     .replace(', CP', '')
    //     .replace(', RN', '')

    //     return {
    //       id: feature?.place_id,
    //       locationName: displayName,
    //       latitude: feature?.lat,
    //       longitude: feature?.lon
    //     }
    //   });
    //   this.pickupLocationData = data;
    // });

    this.searchInput.next(searchTerm);
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
        //throw new Error(`ORS error ${res.status}: ${await res.text()}`);
        // this.locationService.getNearestRoad(start[0], start[1]).subscribe((res: any) => {
        //   console.log('Nearest Road:', res);
        //   var p = res.waypoints[0];
        //   var nearestRoad: [number, number] = [p.location[0], p.location[1]];
        //   this.routeDriving(start, nearestRoad);
        // });
      }

      this.routeDriving2(start, end);

      // this.getRoutingData(start, end).subscribe({
      //   next: (data) => {
      //     console.log('Route Driving Data:', data);
      //     var properties = data?.features?.[0]?.properties;
      //     const km = (properties?.summary?.distance ?? 0) / 1000;
      //     const min = (properties?.summary?.duration ?? 0) / 60;
      //     const latLngs: [number, number][] = [start, end];
      //     this.commonService.isDataLoading = false;
      //     return { distanceKm: km, durationMin: min, latLngs };
      //     console.log('KM:', km, 'Min:', min, 'LatLngs:', latLngs);
      //   },
      //   error: (err) => {
      //     console.error('Routing failed:', err);
      //     throw new Error(`ORS error: ${ err.message || 'Unknown error' }`);
      //   }
      // });
  
      const json = await res.json();
      const route = json?.routes?.[0];
      if (!route) throw new Error('No route found');
  
      const km = (route.summary?.distance ?? 0) / 1000;
      const min = (route.summary?.duration ?? 0) / 60;
      const latLngs: [number, number][] = [start, end];
      this.commonService.isDataLoading = false;
      return { distanceKm: km, durationMin: min, latLngs };
    }

  async routeDriving2(start: [number, number], end: [number, number]): Promise<RouteResult> {
    const data = await firstValueFrom(
      this.getRoutingData(start, end)
    );

    var properties = data?.features?.[0]?.properties;
    const km = (properties?.summary?.distance ?? 0) / 1000;
    const min = (properties?.summary?.duration ?? 0) / 60;
    const latLngs: [number, number][] = [start, end];
    this.commonService.isDataLoading = false;
    return { distanceKm: km, durationMin: min, latLngs };
  }

    // async getRoutingData(start: [number, number], end: [number, number]) {
    //   const res = await this.locationService.getRouteDrivingData(start, end).subscribe({
    //     next: (res: any) => {
    //       console.log('Route Driving Data:', res);
    //     },
    //     error: (err) => {
    //       this.locationService.getNearestRoad(start[0], start[1]).subscribe((res: any) => {
    //         this.getRoutingData(start, end);
    //       });
    //     }
    //   });
  
    //   const json = await res.json();
    //   return json;
    // }

    getRoutingData(start: [number, number], end: [number, number]): Observable<any> {
      return this.locationService.getRouteDrivingData(start, end).pipe(
        catchError(() => {
          return this.locationService.getNearestRoad(end[0], end[1]).pipe(
            switchMap((res: any) => {
              var waypoints = res.waypoints[0];
              var nearestLocation: [number, number] = [waypoints.location[0], waypoints.location[1]];
              return this.locationService.getRouteDrivingData(start, nearestLocation);
            }
            )
          );
        })
      );
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

  onSearchTourDetails(): void {
    if (this.pickupSearchForm.valid) {
      // this.pickupSearchFormData.vehicleTypeId = this.pickupSelectedVehicle;
      // console.log(this.pickupSearchFormData);
    }
  }

  nextAirportPickupStep(): void {
    this.airportPickupStep++;
  }

  previousAirportPickupStep(): void {
    if (this.airportPickupStep > 1) {
      this.airportPickupStep--;
    }
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
    var countryCode = this.personalInfoForm.controls['country'].value;
    var countryDetails = this.countryList.find((x: any) => x.iso2 == countryCode);
    if (this.pickupSearchForm.valid && this.personalInfoForm.valid) {
      var personalInfo: PersonalInfo = {
        firstName: this.personalInfoForm.controls['firstName'].value,
        lastName: this.personalInfoForm.controls['lastName'].value,
        email: this.personalInfoForm.controls['email'].value,
        mobileNumber: this.personalInfoForm.controls['mobileNumber'].value,
        country: countryDetails?.name,
        adultCount: this.personalInfoForm.controls['adultCount'].value,
        childCount: this.personalInfoForm.controls['childCount'].value,
        flightNumber: this.personalInfoForm.controls['flightNumber'].value
      }

      this.pickupSearchFormData.date = this.PickupDate?.value;
      this.pickupSearchFormData.time = this.PickupTime?.value;
      this.pickupSearchFormData.vehicleTypeId = this.selectedVehicleTypeId;
      this.pickupSearchFormData.vehicleType = this.commonService.selectedVehicleTypeName;
      this.pickupSearchFormData.adultCount = this.personalInfoForm.controls['adultCount'].value;
      this.pickupSearchFormData.childCount = this.personalInfoForm.controls['childCount'].value;
      this.pickupSearchFormData.flightNumber = this.personalInfoForm.controls['flightNumber'].value;

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
        vehicleTypeRef: this.selectedVehicleType.id,
        vehicleType: this.selectedVehicleType,
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
        const emailObj = {
          to: userEmail,
          subject: `${this.pickupSearchFormData.pickupLocation} to ${this.pickupSearchFormData.destination} tour booking is successful.`,
          text: "",
          userName: this.commonService.user.displayName ?? 'sir/madam',
          url: `${window.location.origin}/checkout/${docRef.id}`,
          reason: 'booking_confirmation'
        }
        if (userEmail != null) {
          this.emailService.sendEmail(emailObj).subscribe({
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

  
  openVehicleImagePopup() {
    this.showVehicleImagePopup = true;
  }

  onCloseVehicleImagePopup() {
    this.showVehicleImagePopup = false;
  }

  openMapPopup() {
    this.showMapPopup = true;
  }

  onCloseMapPopup() {
    this.showMapPopup = false;
  }
}
