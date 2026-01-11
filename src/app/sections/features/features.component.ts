import { Component } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      icon: 'location',
      title: 'Handpicked Destination',
      description: 'Our strict screening process means you\'re only seeing the best quality treks.'
    },
    {
      icon: 'credit-card',
      title: 'Best Price Guaranteed',
      description: 'Our Best Price Guarantee means that you can be sure of booking at the best rate.'
    },
    {
      icon: 'headphones',
      title: '24/7 Customer Service',
      description: 'Our customer are standing by 24/7 to make your experience incredible.'
    }
  ];

}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}
