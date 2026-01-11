import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  searchForm: any;
  activeTab: string = 'tour';
  guestCount: number = 1;

  features = [
    { icon: '✓', text: 'Private Taxi' },
    { icon: '✓', text: 'Custom Tours' },
    { icon: '✓', text: 'Local Guide' }
  ];

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      destination: ['', Validators.required],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      guests: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Set default dates to today
    const today = new Date().toISOString().split('T')[0];
    this.searchForm.patchValue({
      checkIn: today,
      checkOut: today
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

  onSearch(): void {
    if (this.searchForm.valid) {
      console.log('Search params:', this.searchForm.value);
      // Implement your search logic here
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
