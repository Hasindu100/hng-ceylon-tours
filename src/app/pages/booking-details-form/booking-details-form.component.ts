import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { PhoneNumberUtil, PhoneNumberFormat, PhoneNumberType } from 'google-libphonenumber';
import intlTelInput from 'intl-tel-input';
import { LocationVM } from 'src/app/models/tour';
import { TourDetails } from 'src/app/models/tourDetails';

@Component({
  selector: 'app-booking-details-form',
  templateUrl: './booking-details-form.component.html',
  styleUrls: ['./booking-details-form.component.scss']
})
export class BookingDetailsFormComponent {
  currentStep = 1;
  totalSteps = 3;
  userForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = false;
  countryList: any[] = [];

  // Booking details from previous step (you can pass these as @Input() or via service)
  bookingDetails = {
    pickupLocation: '',
    dropLocation: '',
    date: '',
    time: '',
    guests: 1,
    vehicleType: ''
  };

  searchDetails!: TourDetails;

  iti: any;
  private phoneUtil = PhoneNumberUtil.getInstance();

  @ViewChild('phoneInput') phoneInput!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private commonService: CommonService) {
    this.userForm = this.fb.group({
      // Step 1: Personal Information
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      country: ['', Validators.required],
      
      // Step 2: Additional Details
      numberOfAdults: [1, [Validators.required, Validators.min(1)]],
      numberOfChildren: [0, [Validators.min(0)]],
      specialRequests: [''],
      
      // Step 3: Emergency Contact
      emergencyContactName: ['', Validators.required],
      emergencyContactPhone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.getCountryList();
    this.setSearchFormData();
  }

  ngAfterViewInit() {
    this.iti = intlTelInput(this.phoneInput.nativeElement, {
      initialCountry: 'lk',
      separateDialCode: true
    });
  }

  setSearchFormData() {
    const searchFormSession = sessionStorage.getItem('tourDetails');
    if (searchFormSession) {
      this.searchDetails = JSON.parse(searchFormSession);
      
    }
  }

  getCountryList() {
    this.commonService.getCountryList().subscribe((data: any) => {
      this.countryList = data;
    });
  }

  onCountryChange(): void {
    console.log(this.userForm.controls['country'].value);
    this.iti.setCountry(this.userForm.controls['country'].value);
  }

  nextStep(): void {
    if (this.validateCurrentStep()) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  validateCurrentStep(): boolean {
    let fields: string[] = [];

    switch (this.currentStep) {
      case 1:
        fields = ['fullName', 'email', 'phone', 'country'];
        break;
      case 2:
        fields = ['numberOfAdults', 'numberOfChildren'];
        break;
      case 3:
        fields = ['emergencyContactName', 'emergencyContactPhone', 'termsAccepted'];
        break;
    }

    let isValid = true;
    fields.forEach(field => {
      const control = this.userForm.get(field);
      if (control) {
        control.markAsTouched();
        if (control.invalid) {
          isValid = false;
        }
      }
    });

    return isValid;
  }

  getProgress(): number {
    return (this.currentStep / this.totalSteps) * 100;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isSubmitting = true;
      
      const formData = {
        ...this.userForm.value,
        ...this.bookingDetails,
        submittedAt: new Date().toISOString()
      };

      // Send to your backend API endpoint
      // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
      this.http.post('YOUR_API_ENDPOINT/send-booking', formData)
        .subscribe({
          next: (response) => {
            console.log('Booking submitted successfully', response);
            this.submitSuccess = true;
            this.isSubmitting = false;
            // Reset form after successful submission
            setTimeout(() => {
              this.userForm.reset();
              this.currentStep = 1;
            }, 3000);
          },
          error: (error) => {
            console.error('Error submitting booking', error);
            this.submitError = true;
            this.isSubmitting = false;
          }
        });
    } else {
      this.validateCurrentStep();
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.userForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getErrorMessage(fieldName: string): string {
    const field = this.userForm.get(fieldName);
    
    if (field?.errors) {
      if (field.errors['required']) return 'This field is required';
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['pattern']) return 'Please enter a valid phone number';
      if (field.errors['minLength']) return 'Name must be at least 3 characters';
      if (field.errors['min']) return 'Value must be greater than 0';
    }
    
    return '';
  }
}
