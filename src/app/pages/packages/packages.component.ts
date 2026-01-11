import { Component } from '@angular/core';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent {
tourCards: TourCard[] = [
    {
      id: 1,
      title: 'Wildlife & Nature Tour',
      startingPrice: 1300,
      currency: 'USD',
      nights: 9,
      imageUrl: 'https://srilankatravelpages.com/my_content/uploads/2023/12/Where-to-See-Sri-Lankan-Elephants.jpg',
      imageAlt: 'Group of elephants near water'
    },
    {
      id: 2,
      title: 'Wildlife Tour',
      startingPrice: 1080,
      currency: 'USD',
      nights: 9,
      imageUrl: 'https://media.istockphoto.com/id/637135886/photo/ceylon-leopard-lying-on-a-wooden-log.jpg?s=612x612&w=0&k=20&c=14OzsMO8vMz5qrxj4Tl1-xuuTbjpjMb0JVNi8aiaHNk=',
      imageAlt: 'Leopard resting on tree branch'
    },
    {
      id: 3,
      title: 'Photography Tour In Sri Lanka',
      startingPrice: 1460,
      currency: 'USD',
      nights: 11,
      imageUrl: 'https://ychef.files.bbci.co.uk/624x351/p0b7n6dm.jpg',
      imageAlt: 'Photographer taking pictures of landscape'
    }
  ];

  constructor() { }

  trackByTourId(index: number, tour: TourCard): number {
    return tour.id;
  }

  onCardClick(tour: TourCard): void {
    console.log('Tour card clicked:', tour);
    // Implement navigation or modal logic here
  }

  onBookNow(tour: TourCard, event: Event): void {
    event.stopPropagation();
    console.log('Book now clicked for:', tour);
    // Implement booking logic here
  }
}

export interface TourCard {
  id: number;
  title: string;
  startingPrice: number;
  currency: string;
  nights: number;
  imageUrl: string;
  imageAlt: string;
}
