import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
@ViewChild('carousel', { static: false }) carousel!: ElementRef;

  destinations: Destination[] = [
    {
      id: 1,
      name: 'Paris',
      country: 'France',
      travelers: '150,000 Travelers',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      name: 'New York',
      country: 'USA',
      travelers: '250,000 Travelers',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      name: 'Rome',
      country: 'Italy',
      travelers: '180,000 Travelers',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      name: 'Tokyo',
      country: 'Japan',
      travelers: '200,000 Travelers',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      name: 'Sydney',
      country: 'Australia',
      travelers: '120,000 Travelers',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  currentIndex = 0;
  itemsPerView = 4;
  isAnimating = false;

  ngOnInit(): void {
    this.updateItemsPerView();
    window.addEventListener('resize', () => this.updateItemsPerView());
  }

  updateItemsPerView(): void {
    const width = window.innerWidth;
    if (width >= 1200) {
      this.itemsPerView = 4;
    } else if (width >= 768) {
      this.itemsPerView = 3;
    } else if (width >= 576) {
      this.itemsPerView = 2;
    } else {
      this.itemsPerView = 1;
    }
  }

  get maxIndex(): number {
    return Math.max(0, this.destinations.length - this.itemsPerView);
  }

  get canGoPrevious(): boolean {
    return this.currentIndex > 0;
  }

  get canGoNext(): boolean {
    return this.currentIndex < this.maxIndex;
  }

  previous(): void {
    if (this.canGoPrevious && !this.isAnimating) {
      this.isAnimating = true;
      this.currentIndex--;
      setTimeout(() => {
        this.isAnimating = false;
      }, 300);
    }
  }

  next(): void {
    if (this.canGoNext && !this.isAnimating) {
      this.isAnimating = true;
      this.currentIndex++;
      setTimeout(() => {
        this.isAnimating = false;
      }, 300);
    }
  }

  getTransformStyle(): string {
    const translateX = -(this.currentIndex * (100 / this.itemsPerView));
    return `translateX(${translateX}%)`;
  }

  onDestinationClick(destination: Destination): void {
    console.log('Destination clicked:', destination);
    // Add your navigation logic here
  }
}

export interface Destination {
  id: number;
  name: string;
  country: string;
  travelers: string;
  image: string;
}
