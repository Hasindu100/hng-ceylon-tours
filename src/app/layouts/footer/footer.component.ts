import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  // Contact information
  contactInfo = {
    companyName: 'HNG Ceylon Tours (Pvt) Ltd.',
    address: 'HNG Ceylon Tours (PVT) LTD Wasana, Mahena, Devinuwara, Mathara.',
    country: 'Sri Lanka',
    phone: '+94 77 535 6866',
    email: 'hngceylontours@gmail.com'
  };

  // Navigation links
  quickLinks = [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about' },
    { label: 'Contact', url: '/contact' }
  ];

  // Header Navigation links
  headerNavLinks = [
    { label: 'Home', url: '/' },
    { label: 'Things to do', url: '/things-todo' },
    { label: 'Trip Type', url: '/tours' },
    { label: 'Activities', url: '/activities' },
    { label: 'About', url: '/about' },
    { label: 'Contact', url: '/contact' }
  ];

  // Social media links
  socialLinks = [
    { platform: 'facebook', url: 'https://facebook.com/tourslanka', icon: 'fa fa-facebook' },
    { platform: 'facebook', url: 'https://facebook.com/tourslanka', icon: 'fa fa-tripadvisor' },
    { platform: 'instagram', url: 'https://instagram.com/tourslanka', icon: 'fa fa-instagram' }
  ];



  // Navigation methods
  navigateTo(url: string): void {
    // Add your navigation logic here
    console.log('Navigate to:', url);
  }

  openSocialLink(url: string): void {
    window.open(url, '_blank');
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
