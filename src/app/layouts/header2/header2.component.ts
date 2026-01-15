import { Component, HostListener } from '@angular/core';
import { ToursService } from 'src/app/services/tours.service';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss']
})
export class Header2Component {
isMobileMenuOpen = false;
  isScrolled = false;

  // Contact information
  phone = '+94773870335';
  email = 'hngceylontours@gmail.com';

  // Navigation items
  navigationItems = [
    { label: 'Home', route: '/', active: true },
    { label: 'Things to do', route: '/things-todo', hasDropdown: false },
    { label: 'Trip Type', route: '/tours', hasDropdown: true },
    { label: 'Activities', route: '', hasDropdown: true },
    { label: 'About', route: '/about', hasDropdown: false },
    { label: 'Contact', route: '/contact' }
  ];

  // Social media links
  socialLinks = [
    { icon: 'fa fa-facebook', url: '#', label: 'Facebook' },
    { icon: 'fa fa-instagram', url: '#', label: 'Instagram' },
    { icon: 'fa fa-whatsapp', url: '#', label: 'WhatsApp' },
    { icon: 'fa fa-tripadvisor', url: '#', label: 'TripAdvisor' }
  ];

  tourTypeList: any[] = [];

  constructor(private toursService: ToursService) { }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.getTourTypes();
  }

  getTourTypes() {
    this.toursService.getTourTypes().subscribe((res: any) => {
      this.tourTypeList = res;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 10;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth > 768) {
      this.isMobileMenuOpen = false;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  onNavItemClick(item: any): void {
    // Handle navigation logic here
    console.log('Navigate to:', item.route);
    this.closeMobileMenu();
  }

  onSocialClick(social: any): void {
    // Handle social media link clicks
    window.open(social.url, '_blank');
  }

  callPhone(): void {
    window.location.href = `tel:${this.phone}`;
  }

  sendEmail(): void {
    window.location.href = `mailto:${this.email}`;
  }
}
