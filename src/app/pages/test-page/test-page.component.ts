import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

import {
  PhoneNumberUtil,
  PhoneNumberFormat,
  PhoneNumberType
} from 'google-libphonenumber';


@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent {
  @ViewChild('phoneInput') phoneInput!: ElementRef<HTMLInputElement>;

  

form: FormGroup = this.fb.group({
    countryIso: ['', Validators.required],
    national:   ['', [Validators.required]],
  });

  countries: any[] = [];      // populated from API
  selectedDialCode = '';
  nationalPlaceholder = 'Enter number';
  e164: string | null = null;
  errorText = 'Please enter a valid mobile number';

  iti: any;
   private phoneUtil = PhoneNumberUtil.getInstance();

  constructor(private fb: FormBuilder,
    private commonService: CommonService
  ) {}

  
ngAfterViewInit() {
    // this.iti = intlTelInput(this.phoneInput.nativeElement, {
    //   initialCountry: 'lk',
    //   separateDialCode: true
    // });

  }



ngOnDestroy(): void {
    // Clean up to prevent stuck dropdown / duplicate handlers
    if (this.iti && typeof this.iti.destroy === 'function') {
      this.iti.destroy();
    }
  }



onInputChange(event: Event) {
    
  }

  
ngOnInit(): void {
  this.getCountryList();
  }

  getCountryList() {
    this.commonService.getCountryList().subscribe((countries) => {
      this.countries = countries;

      
const lk = this.countries.find(c => c.iso2 === 'LK') || this.countries[0];
      const iso = lk?.iso2 || '';
      this.form.patchValue({ countryIso: iso }, { emitEvent: false });

      // Attach our libphonenumber-based validator (depends on countryIso)
      this.form.controls['national'].setValidators([
        Validators.required,
        this.mobileNumberValidator.bind(this)
      ]);

      this.applyCountryDefaults();
      this.updateE164();


      // Recompute derived values on form changes
      this.form.valueChanges.subscribe(() => {
        this.updateE164();
        this.updateError();
      });

    });
  }

  

// ng-select change
  onCountryChange(): void {
    this.applyCountryDefaults();
    // Re-validate national because region changed
    this.form.controls['national'].updateValueAndValidity();
    this.updateE164();
    this.iti.setCountry(this.form.controls['countryIso'].value);
  }

  // Keep the input numeric (national part only)
  digitsOnly(evt: Event): void {
    const input = evt.target as HTMLInputElement;
    const cleaned = input.value.replace(/[^\d]/g, '');
    if (cleaned !== input.value) {
      input.value = cleaned;
      this.form.controls['national'].setValue(cleaned);
    }
  }

  // --- COUNTRY-AWARE MOBILE VALIDATOR (libphonenumber) ---
  private mobileNumberValidator(control: AbstractControl): ValidationErrors | null {
    const national = (control.value ?? '').toString();
    const iso = this.form?.get('countryIso')?.value as string;
    if (!iso || !national) return null; // let required handle empties

    const c = this.countries.find(x => x.iso2 === iso);
    if (!c) return { phoneInvalid: true };

    try {
      // Build a complete number using the read-only dial code + national digits
      const full = `${c.dialCode}${national}`;   // e.g., +9471xxxxxxx
      const number = this.phoneUtil.parseAndKeepRawInput(full);

      // Validate by region and overall
      const validForRegion = this.phoneUtil.isValidNumberForRegion(number, iso);
      if (!validForRegion || !this.phoneUtil.isValidNumber(number)) {
        return { phoneInvalid: true };
      }

      // Enforce "mobile" type where applicable.
      // Some countries only expose "FIXED_LINE_OR_MOBILE" — accept that too.
      const type = this.phoneUtil.getNumberType(number);
      if (type !== PhoneNumberType.MOBILE && type !== PhoneNumberType.FIXED_LINE_OR_MOBILE) {
        return { notMobile: true };
      }

      return null; // valid
    } catch {
      return { phoneInvalid: true };
    }
  }

  private applyCountryDefaults(): void {
    const iso = this.form.controls['countryIso'].value as string;
    const c = this.countries.find(x => x.iso2 === iso);
    if (!c) return;

    this.selectedDialCode = c.dialCode;

    // Optional per-country hints
    this.nationalPlaceholder =
      iso === 'LK' ? '7XXXXXXXX' :
      iso === 'IN' ? '9XXXXXXXXX' :
      'Enter number';
  }

  private updateE164(): void {
    const iso = this.form.controls['countryIso'].value as string;
    const c = this.countries.find(x => x.iso2 === iso);
    const national = (this.form.controls['national'].value || '').toString();
    this.e164 = c && national ? `${c.dialCode}${national}` : null;
  }

  private updateError(): void {
    const nationalCtrl = this.form.controls['national'];
    if (nationalCtrl.hasError('notMobile')) {
      this.errorText = 'Please enter a mobile number (not a landline)'; return;
    }
    if (nationalCtrl.hasError('phoneInvalid')) {
      this.errorText = 'Invalid number for the selected country'; return;
    }
    if (nationalCtrl.hasError('required')) {
      this.errorText = 'Mobile number is required'; return;
    }
    this.errorText = 'Please enter a valid mobile number';
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const iso = this.form.controls['countryIso'].value as string;
    const c = this.countries.find(x => x.iso2 === iso)!;
    const national = this.form.controls['national'].value as string;
    const e164 = `${c.dialCode}${national}`; // already validated

    console.log('Saving E.164:', e164, 'Country ISO:', iso);
  }





}


type Country = {
  name: string;
  iso2: string;      // e.g., 'LK'
  dialCode: string;  // e.g., '+94'
  flag: string;      // emoji flag (optional)
  min?: number;      // min length for national number
  max?: number;      // max length for national number
};


export interface CountryOption {
  name: string;      // "Sri Lanka"
  iso2: string;      // "LK"
  dialCode: string;  // "+94" (single preferred dial code)
  dialCodes: string[]; // all possible dial codes, e.g., ["+1 809","+1 829","+1 849"] for DO
  flagPng?: string;  // optional flag
}
export interface CountryOption2 {
  name: string;      // "Sri Lanka"
  id: string;      // "LK"
  dialCode: string;  // "+94" (single preferred dial code)
  flagPng?: string;  // optional flag
  iso2?: string;      // "LK"
}


