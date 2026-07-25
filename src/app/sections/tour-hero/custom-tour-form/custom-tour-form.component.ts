import { Component, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { th } from 'intl-tel-input/i18n';
import { ToastrService } from 'ngx-toastr';
import { firstValueFrom, map, retry, take } from 'rxjs';
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
  selector: 'app-custom-tour-form',
  templateUrl: './custom-tour-form.component.html',
  styleUrls: ['./custom-tour-form.component.scss']
})
export class CustomTourFormComponent {
  step: number = 1;
    searchForm!: FormGroup;
    personalInfoForm!: FormGroup;
    locationData: any[] = [];
    pickupLocation: string = '';
    destination: string = '';
    pickupLonLang: any;
    destinationLonLang: any;
    distanceKm: number | null = null;
    priceRatePerKM: number = 1;
    totalTourPrice: number = 0;
    selectedVehicleTypeId: number = VehicleType.Car;
    selectedVehicleType: any;
    vehicleTypes: VehicleTypeVM[] = [];
    tourTypes: any[] = [];
    countryList: any[] = [];
    googleAuthProvider = new GoogleAuthProvider();
    //auth instance
    auth = inject(Auth);
    errorMessage: string = '';
    showVehicleImagePopup: boolean = false;
  
    searchFormData: TourDetails2 = {
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
      noOfDays: 0,
    }
  
    //#region search form controls
    get PickupLocation() {
      return this.searchForm.get('pickupLocation');
    }
    get Destination() {
      return this.searchForm.get('destination');
    }
    get PickupDate() {
      return this.searchForm.get('pickupDate');
    }
    get NoOfDays() {
      return this.searchForm.get('noOfDays');
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
    get CustomTourType() {
      return this.personalInfoForm.get('customTourType');
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
      private router: Router,
      private toaster: ToastrService) {
      this.searchForm = this.fb.group({
        pickupLocation: ['0', [Validators.required, Validators.min(1)]],
        destination: ['0', [Validators.required, Validators.min(1)]],
        pickupDate: ['', Validators.required],
        noOfDays: ['', [Validators.required, Validators.min(1)]]
      });
  
      this.personalInfoForm = this.fb.group({
        country: ['', [Validators.required]],
        mobileNumber: ['', [Validators.required]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        adultCount: ['1', [Validators.required, Validators.min(1)]],
        childCount: ['0', [Validators.required, Validators.min(0)]],
        customTourType: ['0', [Validators.required, Validators.min(1)]]
      });
    }
  
    ngOnInit(): void {
      // Set default dates to today
      const today = new Date().toISOString().split('T')[0];
      this.searchForm.patchValue({
        pickupDate: today
      });
      this.getLocationData();
      this.getVehicleTypesData();
      this.getCountryList();
      this.getTourTypes();
    }
  
    getLocationData() {
      this.locationService.loadLocationData().subscribe((data: any) => {
        this.locationData = data;
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

    getTourTypes() {
      this.tourService.getTourTypes().subscribe((data: any) => {
        this.tourTypes = data;
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
    }
  
    async onChangeDropLocationChange() {
      let pickupLocation = this.locationData.find(loc => loc.id === this.PickupLocation?.value);
      let destination = this.locationData.find(loc => loc.id === this.Destination?.value);
      this.pickupLocation = pickupLocation?.locationName || '';
      this.destination = destination?.locationName || '';
      this.pickupLonLang = [(pickupLocation?.longitude || 0), (pickupLocation?.latitude || 0)];
      this.destinationLonLang = [(destination?.longitude || 0), (destination?.latitude || 0)];
  
      this.searchFormData.pickupLocation = pickupLocation?.locationName || '';
      this.searchFormData.destination = destination?.locationName || '';
      this.searchFormData.pickupLonLang = [(pickupLocation?.longitude || 0), (pickupLocation?.latitude || 0)];
      this.searchFormData.destinationLonLang = [(destination?.longitude || 0), (destination?.latitude || 0)];
    }
  
    onSearchTourDetails(): void {
      if (this.searchForm.valid) {
        // this.pickupSearchFormData.vehicleTypeId = this.pickupSelectedVehicle;
        // console.log(this.pickupSearchFormData);
      }
    }
  
    nextStep(): void {
      this.step++;
    }
  
    previousStep(): void {
      if (this.step > 1) {
        this.step--;
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
            this.toaster.error('Something went wrong. Please try again later.', 'Error');
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
      if (this.searchForm.valid && this.personalInfoForm.valid) {
        var personalInfo: PersonalInfo = {
          firstName: this.personalInfoForm.controls['firstName'].value,
          lastName: this.personalInfoForm.controls['lastName'].value,
          email: this.personalInfoForm.controls['email'].value,
          mobileNumber: this.personalInfoForm.controls['mobileNumber'].value,
          country: countryDetails?.name,
          adultCount: this.personalInfoForm.controls['adultCount'].value,
          childCount: this.personalInfoForm.controls['childCount'].value,
          flightNumber: ''
        }
  
        this.searchFormData.date = this.PickupDate?.value;
        this.searchFormData.noOfDays = this.NoOfDays?.value;
        this.searchFormData.vehicleTypeId = this.selectedVehicleTypeId;
        this.searchFormData.vehicleType = this.commonService.selectedVehicleTypeName;
        this.searchFormData.adultCount = this.personalInfoForm.controls['adultCount'].value;
        this.searchFormData.childCount = this.personalInfoForm.controls['childCount'].value;
  
        let pickupLocation = this.locationData.find(loc => loc.id === this.PickupLocation?.value);
        let destination = this.locationData.find(loc => loc.id === this.Destination?.value);
        let selectedTourType = this.tourTypes.find(x => x.id == this.personalInfoForm.controls['customTourType'].value);
        
        var bookingData: BookingVM = {
          userId: this.user.uid,
          pickup: {
            address: this.searchFormData.pickupLocation,
            lat: (pickupLocation?.latitude || 0),
            lng: (pickupLocation?.longitude || 0)
          },
          dropoff: {
            address: this.searchFormData.destination,
            lat: (destination?.latitude || 0),
            lng: (destination?.longitude || 0)
          },
          distanceKm: null,
          duration: null,
          totalPrice: 0,
          date: this.searchFormData.date,
          time: this.searchFormData.time,
          vehicleTypeRef: this.selectedVehicleType.id,
          vehicleType: this.selectedVehicleType,
          adultCount: this.searchFormData.adultCount,
          childCount: this.searchFormData.childCount,
          flightNumber: '',
          email: personalInfo.email,
          mobileNumber: personalInfo.mobileNumber,
          firstName: personalInfo.firstName,
          lastName: personalInfo.lastName,
          country: personalInfo.country,
          status: BookingStatus.InProgress,
          tourType: {
            id: 3,
            name: 'Custom Tour'
          },
          createdAt: new Date(),
          updatedAt: new Date(),
          noOfDays: this.NoOfDays?.value,
          customTourType: {
            id: selectedTourType.id,
            tourType: selectedTourType.name,
          }
        }
  
        this.bookingService.saveBooking(bookingData).then((docRef) => {
          // Email Logic
          const userEmail = this.commonService.user.email;
          if (userEmail != null) {
            this.emailService.sendEmail(userEmail).subscribe({
              next: (res) => {
                this.toaster.success('Booking successful! A confirmation email has been sent to your email address.', 'Success');
                this.router.navigate([`/booking-history`]);
              },
              error: (err) => {
                this.toaster.error('Something went wrong. Please try again later.', 'Error');
              }
            });
          }
          else {
            this.toaster.success('Booking successful!', 'Success');
            this.router.navigate([`/booking-history`]);
          }
        }).catch((error) => {
          this.toaster.error('Something went wrong. Please try again later.', 'Error');
        });
      }
    }

  openVehicleImagePopup() {
    this.showVehicleImagePopup = true;
  }

  onCloseVehicleImagePopup() {
    this.showVehicleImagePopup = false;
  }
}
