import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var L: any;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
contactForm: FormGroup;
  isSubmitting = false;

  contactInfo = [
    {
      icon: 'fa-solid fa-phone-volume',
      title: 'Phone',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: 'fa-solid fa-envelope',
      title: 'Email',
      value: 'hello@company.com',
      link: 'mailto:hello@company.com'
    },
    {
      icon: 'fa-solid fa-location-dot',
      title: 'Office Location',
      value: '123 Business Street, Suite 100\nCity, State 12345',
      link: '#'
    },
    {
      icon: 'fa-solid fa-clock',
      title: 'Business Hours',
      value: 'Mon - Fri: 9:00 AM - 6:00 PM\nSat - Sun: Closed',
      link: '#'
    }
  ];

  socialLinks = [
    { platform: 'facebook', url: 'https://facebook.com', color: '#1877f2' },
    { platform: 'twitter', url: 'https://twitter.com', color: '#1da1f2' },
    { platform: 'linkedin', url: 'https://linkedin.com', color: '#0077b5' },
    { platform: 'youtube', url: 'https://youtube.com', color: '#ff0000' }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      company: [''],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  private initializeMap(): void {
    // Colombo coordinates
    const colomboLat = 6.9271;
    const colomboLng = 79.8612;

    // Initialize the map
    const map = L.map('map').setView([colomboLat, colomboLng], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add a marker for Colombo
    const marker = L.marker([colomboLat, colomboLng]).addTo(map);
    marker.bindPopup('<b>Colombo, Sri Lanka</b><br>Our Office Location').openPopup();

    // Custom marker icon (optional)
    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: '<div style="background: #ef4444; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    L.marker([colomboLat, colomboLng], { icon: customIcon }).addTo(map);
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', this.contactForm.value);
        this.isSubmitting = false;
        this.contactForm.reset();
        // Show success message
        alert('Message sent successfully!');
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) return `${fieldName} is too short`;
      if (field.errors['pattern']) return 'Please enter a valid phone number';
    }
    return '';
  }

  hasFieldError(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.errors && field.touched);
  }
}
