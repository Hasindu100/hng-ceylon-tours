import { Component, HostListener } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { ToursService } from 'src/app/services/tours.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent {
isMobileMenuOpen = false;
  isScrolled = false;

  // Contact information
  phone = '+94773870335';
  email = 'info@off2srilanka.com';

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
    { icon: 'facebook', url: '#', label: 'Facebook' },
    { icon: 'instagram', url: '#', label: 'Instagram' },
    { icon: 'whatsapp', url: '#', label: 'WhatsApp' },
    { icon: 'tripadvisor', url: '#', label: 'TripAdvisor' }
  ];

  tourTypeList: any[] = [];

  constructor(private toursService: ToursService,
    private commonService: CommonService) { }

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
    if (typeof window !== 'undefined') {
      this.isScrolled = window.pageYOffset > 10;
    }
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
    this.commonService.onWindowOpenBlank(social.url);
  }

  callPhone(): void {
    this.commonService.onWindowOpen(`tel:${this.phone}`);
  }

  sendEmail(): void {
    this.commonService.onWindowOpen(`mailto:${this.email}`);
  }
}
