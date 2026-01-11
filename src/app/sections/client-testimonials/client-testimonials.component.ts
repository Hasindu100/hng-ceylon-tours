import { Component } from '@angular/core';

@Component({
  selector: 'app-client-testimonials',
  templateUrl: './client-testimonials.component.html',
  styleUrls: ['./client-testimonials.component.scss']
})
export class ClientTestimonialsComponent {
  currentSlide = 0;
  autoSlideInterval: any;

  testimonials: Testimonial[] = [
    {
      id: 1,
      rating: 5,
      title: '5* team and experience all around!',
      subtitle: '5 stars all around for Menaka and Ashoka.',
      content: 'We spent 10 days travelling through Yala, Mirissa, Galle, Colombo and Negombo with Ashoka and it was an incredible experience. From the start, Menaka has been responsive and flexible with our ever changing arrangements and he was there to welcome us blooms at the airport. Ashoka was the real gem throughout this trip, he cared so kindly for my parents and kids, making sure they were always taken care every step of the way. Helping us navigate through dark roads, ever the expert on all wildlife especially birds',
      author: 'Sarah Johnson',
      image: 'assets/images/clients/client1.jpg'
    },
    {
      id: 2,
      rating: 5,
      title: 'Amazing Sri Lankan Adventure!',
      subtitle: 'Perfect guide and unforgettable memories.',
      content: 'Our family trip to Sri Lanka was made extraordinary by our wonderful guide. The attention to detail, local knowledge, and genuine care for our comfort made this trip unforgettable. Every location was perfectly planned and executed.',
      author: 'Michael Chen',
      image: 'assets/images/clients/client2.jpg'
    },
    {
      id: 3,
      rating: 5,
      title: 'Exceptional Service Throughout',
      subtitle: 'Professional, friendly, and knowledgeable.',
      content: 'From the moment we landed until our departure, everything was seamless. The cultural insights, wildlife expertise, and flexibility with our itinerary changes made this the best vacation we\'ve ever had.',
      author: 'Emma Williams',
      image: 'assets/images/clients/client3.jpg'
    }
  ];

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide === 0 
      ? this.testimonials.length - 1 
      : this.currentSlide - 1;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getCurrentTestimonial(): Testimonial {
    return this.testimonials[this.currentSlide];
  }
}

export interface Testimonial {
  id: number;
  rating: number;
  title: string;
  subtitle: string;
  content: string;
  author: string;
  image: string;
}
