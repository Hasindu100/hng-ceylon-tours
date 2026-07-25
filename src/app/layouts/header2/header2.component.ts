import { Component, HostListener, inject } from '@angular/core';
import { ToursService } from 'src/app/services/tours.service';
import { Auth, AuthErrorCodes, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, User } from '@angular/fire/auth';
import { UserResolver } from 'src/app/services/user.resolver';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

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
    { label: 'About', route: '/about', hasDropdown: false },
    { label: 'Contact', route: '/contact' },
    { label: 'FAQ', route: '/faq', hasDropdown: false },
    { label: 'Terms & Conditions', route: '/terms', hasDropdown: false },
  ];

  tourTypeList: any[] = [];
  googleAuthProvider = new GoogleAuthProvider();
  //auth instance
  auth = inject(Auth);
  errorMessage: string = '';
  profileImage: string = 'assets/images/logo/header-logo-3.png';
  user!: User;
  currentRoute: string = '/';
  isUserDropdownOpen: boolean = false;

  constructor(private toursService: ToursService, 
    private commonService: CommonService,
    private us: UserResolver,
    public router: Router) {
      this.currentRoute = this.router.url;
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.getTourTypes();
    var p = this.auth;
    this.loadUserDetails();
    this.commonService.loadUserData.next(null);
  }

  // set active state for navigation items based on current route
  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  loadUserDetails() {
    this.commonService.loadUserData$.subscribe(() => {
      this.getUserData();
    });
  }

  async getUserData() {
    await this.us.user$.subscribe((res:any) => {
      this.user = this.commonService.user = res;
      return true;
    });
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

  onSignInWithGoogle() {
    signInWithPopup(this.auth, this.googleAuthProvider)
    .then((response) => {
      //this.redirectToDashboardPage();
    })
    .catch((error => {
      console.error('error:', error);
      this.errorMessage = "Somthing went wrong. Please try again.";
    }))
  }

  onSignOut() {
    signOut(this.auth).then((response) => {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    })
    .catch((error) => {
      console.error('Error occurred:', error);
    });
  }

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }
}
