import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  navigationItems = [
    { label: 'About Us', route: '/about', active: true },
    { label: 'Sri Lanka Travel Guide', route: '/travel-guide', active: false },
    { label: 'Top Destinations', route: '/destinations', active: false },
    { label: 'Sri Lanka Travel FAQs', route: '/faqs', active: false },
    { label: 'Points of Interest', route: '/points-of-interest', active: false },
    { label: 'Events & Festivals', route: '/events', active: false },
    { label: 'World Heritage Sites', route: '/heritage-sites', active: false },
    { label: 'What to Pack', route: '/what-to-pack', active: false },
    { label: 'News', route: '/news', active: false }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onNavigationClick(item: any): void {
    // Reset all items to inactive
    this.navigationItems.forEach(navItem => navItem.active = false);
    // Set clicked item to active
    item.active = true;
    
    // Here you would typically navigate using Angular Router
    // this.router.navigate([item.route]);
  }
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}
