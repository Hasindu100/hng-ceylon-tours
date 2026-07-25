import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  isClickedShowMore: boolean = false;
  title = 'Explore Sri Lanka with Comfort & Confidence';
  
  description = 'From airport arrivals to unforgettable island adventures, GetYourCab delivers private transportation tailored to your travel needs. Skip the hassle of finding local transport and enjoy seamless travel with trusted professional drivers.';
  
  experienceDescription = `Book airport pickups, airport drop-offs, or fully customized sightseeing tours in just a few clicks. Whether you're traveling solo, as a couple, with family, or in a group, we make every journey safe, comfortable, and memorable.`;


  featuresTitle = 'Why Travel Sri Lanka with GetYourCab?';
  featuresSubtitle = 'By booking with GetYourCab, you will be able to:';
  
  features = [
    'From airport pickup to your final drop-off, we handle every transfer smoothly so you can focus on enjoying your journey.',
    'No fixed schedules or rigid plans. Every tour can be customized to match your interests, pace, and travel style.',
    'Travel from tropical beaches to misty mountains, wildlife parks, and ancient cities — all within a single island.',
    'Our tours are powered by local knowledge, ensuring authentic experiences, hidden locations, and genuine cultural connections.',
    'Witness elephants in the wild, spot rare birds, and explore national parks that are among the most biodiverse in Asia.',
    'Walk through ancient kingdoms, sacred temples, and UNESCO heritage sites that still shape Sri Lanka’s culture today.',
    'Travel in comfortable vehicles with professional drivers and carefully planned routes for a safe and stress-free experience.',
    'Enjoy village life, local cuisine, scenic train rides, nature walks, and meaningful moments beyond standard tourist stops.',
    'Book your airport transfers and tours easily through our modern, user‑friendly platform with clear information and support.',
    'More than a holiday — every journey with GetYourCab is designed to create memories you will cherish forever.'
  ];

  ctaText = 'Let us help you create your ideal private escorted';
  ctaLinkText = 'Sri Lanka Tours';
  
  onStartPlanning(): void {
    // Handle start planning action
    console.log('Start Planning Your Experience clicked');
  }

  onClickShowMore() {
    this.isClickedShowMore = !this.isClickedShowMore;
  }
}
