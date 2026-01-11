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
  bookPayLinks = [
    { label: 'How to Book & Pay', url: '/book-pay' },
    { label: 'Child Discounts & Terms', url: '/child-discounts' }
  ];

  popularActivitiesLinks = [
    { label: 'City Tour', url: '/terms' },
    { label: 'Safari', url: '/privacy' },
    { label: 'Hiking', url: '/privacy' },
    { label: 'Surfing', url: '/privacy' },
  ];

  quickLinks = [
    { label: 'Travel FAQs', url: '/faqs' },
    { label: 'Top Destinations', url: '/destinations' },
    { label: 'What to Pack', url: '/packing-guide' }
  ];

  // Social media links
  socialLinks = [
    { platform: 'facebook', url: 'https://facebook.com/tourslanka', icon: 'fa fa-facebook' },
    { platform: 'facebook', url: 'https://facebook.com/tourslanka', icon: 'fa fa-tripadvisor' },
    { platform: 'instagram', url: 'https://instagram.com/tourslanka', icon: 'fa fa-instagram' }
  ];

  // Newsletter signup
  newsletterEmail: string = '';

  onNewsletterSubmit(): void {
    if (this.newsletterEmail) {
      // Handle newsletter subscription
      console.log('Newsletter subscription:', this.newsletterEmail);
      // Add your newsletter subscription logic here
      this.newsletterEmail = '';
    }
  }

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
