import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-reviews',
  templateUrl: './customer-reviews.component.html',
  styleUrls: ['./customer-reviews.component.scss']
})
export class CustomerReviewsComponent {
  features: FeatureItem[] = [
    {
      icon: 'clock',
      title: 'We are based in Sri Lanka',
      description: 'Who better to organize your trip and show you around than the locals? Get the best from your trip with contacts that can only come from people who live in this paradise!'
    },
    {
      icon: 'plane',
      title: 'Experience – Loads of it! Since 1999',
      description: 'Travel confidently, knowing that people facilitating your tour are veterans in the world of special interest travel when it comes to exploring the best of Sri Lanka.'
    },
    {
      icon: 'user',
      title: 'Private Sri Lanka tours',
      description: 'We operate our tours privately. We design customized private tours for individuals, couples, families, honeymooners, friends & small groups. You would experience attention to detail from us.'
    }
  ];

  constructor() { }
}

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}
