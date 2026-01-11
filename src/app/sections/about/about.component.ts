import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  isClickedShowMore: boolean = false;
  title = 'Sri Lanka Tours Private & Tailored';
  
  description = 'Discover Sri Lanka with our Private & Tailored Tours. Meet friendly people, learn of the rich history, explore untouched sites, marvel the wildlife, relax on a beautiful beach. Located at the southern tip of India, Sri Lanka is an island nation surrounded by the warm blue waters of the Indian Ocean.';
  
  experienceDescription = 'Counting over 20 years of experience as a Tour Operator in Sri Lanka providing tailor-made tours, Tourslanka is widely recognized for its friendly service, reliability and professionalism. We are independently owned and have been in business since 1999. You can be assured of a speedy response, accurate information, reliable and friendly service delivered with traditional Sri Lankan warmth.';


  featuresTitle = 'A private tour of this magical island is on top of the wish list of many!';
  featuresSubtitle = 'By taking one of our private escorted tours to Sri Lanka, you will be able to:';
  
  features = [
    'Meet extremely friendly, hospitable and easygoing people.',
    'Stay at authentic hotels and experience our unique itineraries.',
    'Learn about the rich, vibrant and colorful history dating back over 2500 years!',
    'Explore ruined cities, palaces, temples, fortresses, royal pleasure gardens and ancient dagobas – second only to the great pyramids of Egypt.',
    'Enjoy the beautiful lakes, magnificent waterfalls, historic canals, flat and wild rivers, calm and quiet lagoons and marshes.',
    'Marvel at the abundance of animal life with our own sub-species of elephant, leopards, with many birds, butterflies amphibians and plants unique to this island.',
    'Relax in an island with some of the most beautiful beaches, bays and underwater attractions you could find in the world.',
    'Be humbled by panoramic mountains, narrow passes and gaps provide you with some of the finest and most spectacular views you could find anywhere.',
    'Be mesmerized by the astounding variety and depth of handicraft, music, dance and art forms evolved through thousands of years.',
    'Tempt your senses to the to the exotic sights, sounds, smells and tastes that can only be Sri Lanka.'
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
