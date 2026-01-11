import { Component } from '@angular/core';

@Component({
  selector: 'app-header-slider',
  templateUrl: './header-slider.component.html',
  styleUrls: ['./header-slider.component.scss']
})
export class HeaderSliderComponent {
  selectedTour: string = 'Wildlife Tours';
  selectedMonth: string = 'June';
  
  tourOptions: string[] = [
    'Wildlife Tours',
    'Safari Adventures',
    'Nature Expeditions',
    'Photography Tours'
  ];
  
  monthOptions: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Image slider properties
  sliderImages: string[] = [
    'assets/images/hero/slide-1.jpg',
    'assets/images/hero/slide-2.jpg',
    'assets/images/hero/slide-3.jpg',
    'assets/images/hero/slide-4.jpg',
    'assets/images/hero/slide-5.jpg'
  ];

  currentSlide: number = 0;
  sliderInterval: any;
  slideDuration: number = 5000; // 5 seconds

  constructor() { }

  ngOnInit(): void {
    this.startSlider();
  }

  ngOnDestroy(): void {
    this.stopSlider();
  }

  startSlider(): void {
    this.sliderInterval = setInterval(() => {
      this.nextSlide();
    }, this.slideDuration);
  }

  stopSlider(): void {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.sliderImages.length;
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 
      ? this.sliderImages.length - 1 
      : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.resetSliderTimer();
  }

  resetSliderTimer(): void {
    this.stopSlider();
    this.startSlider();
  }

  onTourChange(tour: string): void {
    this.selectedTour = tour;
  }

  onMonthChange(month: string): void {
    this.selectedMonth = month;
  }

  onSearch(): void {
    console.log('Searching for:', this.selectedTour, 'in', this.selectedMonth);
    // Implement search functionality here
  }
}
