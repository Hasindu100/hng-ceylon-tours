import { Component, OnInit } from '@angular/core';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  activeCategory: string = 'general';
  categories: string[] = ['general', 'booking', 'payment', 'vehicles', 'tours'];
  
  faqItems: FAQItem[] = [
    // General Questions
    {
      id: 1,
      category: 'general',
      question: 'What is GetYourCab?',
      answer: 'GetYourCab is a premium transportation service based in Sri Lanka, offering reliable airport transfers, city tours, and customized travel packages. We provide professional drivers, well-maintained vehicles, and exceptional customer service to ensure every journey is comfortable and memorable.',
      isOpen: false
    },
    {
      id: 2,
      category: 'general',
      question: 'How can I contact GetYourCab?',
      answer: 'You can reach us through multiple channels: Call our hotline, visit our website contact form, or email us directly. Our customer support team is available 24/7 to assist you with any inquiries or special requests.',
      isOpen: false
    },
    {
      id: 3,
      category: 'general',
      question: 'Do you operate year-round?',
      answer: 'Yes, GetYourCab operates throughout the year, including holidays and weekends. We provide consistent service regardless of weather conditions or seasonal changes to ensure your travel plans remain unaffected.',
      isOpen: false
    },
    {
      id: 4,
      category: 'general',
      question: 'Are your drivers trained and reliable?',
      answer: 'Absolutely! All our drivers are professionally trained, background-checked, and certified. They have extensive knowledge of Sri Lankan roads, landmarks, and local culture. Your safety and comfort are our top priorities.',
      isOpen: false
    },
    {
      id: 5,
      category: 'general',
      question: 'Do you offer corporate services?',
      answer: 'Yes, we provide tailored corporate solutions including airport transfers, executive transportation, and group tours. We offer competitive rates and flexible packages for businesses of all sizes.',
      isOpen: false
    },

    // Booking Questions
    {
      id: 6,
      category: 'booking',
      question: 'How do I book a ride with GetYourCab?',
      answer: 'Booking is simple! Visit our website, select your service (airport transfer, tour, or custom ride), enter your details, choose your preferred date and time, and confirm. You\'ll receive a confirmation email with all the details.',
      isOpen: false
    },
    {
      id: 7,
      category: 'booking',
      question: 'What is your cancellation policy?',
      answer: 'Cancellations made 24 hours before the scheduled time are free of charge. Cancellations within 24 hours may incur a cancellation fee. For emergency cancellations, please contact us immediately.',
      isOpen: false
    },
    {
      id: 8,
      category: 'booking',
      question: 'How far in advance should I book?',
      answer: 'We recommend booking at least 24-48 hours in advance to secure your preferred date and time. However, we also accommodate last-minute bookings subject to availability.',
      isOpen: false
    },
    {
      id: 9,
      category: 'booking',
      question: 'Can I modify my booking?',
      answer: 'Yes! You can modify your booking through your account dashboard or by contacting our support team. Changes can usually be made up to 24 hours before your scheduled ride at no additional cost.',
      isOpen: false
    },
    {
      id: 10,
      category: 'booking',
      question: 'Do you provide group bookings?',
      answer: 'Definitely! We handle group bookings of any size. We can arrange multiple vehicles if needed and offer special group rates. Please contact us directly to discuss your requirements.',
      isOpen: false
    },

    // Payment Questions
    {
      id: 11,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept multiple payment methods including credit/debit cards (Visa, Mastercard), digital wallets, and bank transfers. All payments are processed securely through our encrypted payment gateway.',
      isOpen: false
    },
    {
      id: 12,
      category: 'payment',
      question: 'Is my payment information secure?',
      answer: 'Yes! We use industry-standard encryption (SSL/TLS) and PCI-DSS compliance to protect all payment information. Your data is never stored on our servers without proper security measures.',
      isOpen: false
    },
    {
      id: 13,
      category: 'payment',
      question: 'Will I receive an invoice?',
      answer: 'Yes, you\'ll receive a detailed invoice via email after your ride is completed. Invoices include itemized charges, distance traveled, and a breakdown of all applicable taxes and fees.',
      isOpen: false
    },
    {
      id: 14,
      category: 'payment',
      question: 'Do you offer discounts or promotional codes?',
      answer: 'Yes! We regularly offer seasonal promotions and loyalty discounts. Sign up for our newsletter to stay updated on current offers, and don\'t forget to check our website for ongoing promotional codes.',
      isOpen: false
    },
    {
      id: 15,
      category: 'payment',
      question: 'What if I have an incorrect charge?',
      answer: 'If you notice a discrepancy, please contact our support team immediately with details of the transaction. We\'ll investigate and resolve any billing issues within 48 hours.',
      isOpen: false
    },

    // Vehicle Questions
    {
      id: 16,
      category: 'vehicles',
      question: 'What types of vehicles are available?',
      answer: 'We offer a variety of vehicles including economy sedans, premium cars, SUVs, and minivans to accommodate different preferences and group sizes. All vehicles are air-conditioned, well-maintained, and regularly serviced.',
      isOpen: false
    },
    {
      id: 17,
      category: 'vehicles',
      question: 'How do I select a vehicle?',
      answer: 'During the booking process, you can view available vehicle options with photos, specifications, and pricing. Select the vehicle that best suits your needs. You can also request a specific vehicle type if available.',
      isOpen: false
    },
    {
      id: 18,
      category: 'vehicles',
      question: 'What is included with my vehicle rental?',
      answer: 'All our vehicles include air conditioning, comfortable seating, complimentary WiFi (in select vehicles), charging ports, and a professional driver. Additional amenities vary by vehicle type.',
      isOpen: false
    },
    {
      id: 19,
      category: 'vehicles',
      question: 'Can I request a vehicle upgrade?',
      answer: 'Yes, upgrades are available subject to availability and may incur an additional fee. You can request an upgrade during booking or by contacting our support team. We\'ll confirm the availability and cost.',
      isOpen: false
    },
    {
      id: 20,
      category: 'vehicles',
      question: 'Are your vehicles accessible for disabled travelers?',
      answer: 'We have wheelchair-accessible vehicles in our fleet. Please mention accessibility requirements during booking so we can arrange the most suitable vehicle and notify your driver.',
      isOpen: false
    },

    // Tour Questions
    {
      id: 21,
      category: 'tours',
      question: 'What tour packages do you offer?',
      answer: 'We offer pre-designed tour packages covering popular destinations across Sri Lanka, including cultural tours, beach tours, hill country tours, and wildlife tours. We also provide customized tours based on your preferences.',
      isOpen: false
    },
    {
      id: 22,
      category: 'tours',
      question: 'How long are your tours?',
      answer: 'Our tours range from half-day (4-5 hours) to full-day (8-10 hours) and multi-day packages. You can customize the duration based on your schedule and interests.',
      isOpen: false
    },
    {
      id: 23,
      category: 'tours',
      question: 'What is included in a tour package?',
      answer: 'Tour packages include professional driver/guide, air-conditioned vehicle, fuel, basic insurance, and pre-planned itineraries. Meals and entrance fees to attractions are typically not included unless specified.',
      isOpen: false
    },
    {
      id: 24,
      category: 'tours',
      question: 'Can I customize my tour itinerary?',
      answer: 'Absolutely! We specialize in customized tours. Tell us your interests, and our team will create a personalized itinerary. Whether it\'s photography, culture, adventure, or relaxation, we\'ll tailor it perfectly.',
      isOpen: false
    },
    {
      id: 25,
      category: 'tours',
      question: 'Do you provide tour guides fluent in different languages?',
      answer: 'Yes! We have guides fluent in English, Sinhala, Tamil, and other languages. Please specify your language preference during booking, and we\'ll arrange an appropriate guide.',
      isOpen: false
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleFAQ(item: FAQItem): void {
    item.isOpen = !item.isOpen;
  }

  filterByCategory(category: string): FAQItem[] {
    return this.faqItems.filter(item => item.category === category);
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
  }

  getCategoryLabel(category: string): string {
    const labels: { [key: string]: string } = {
      'general': 'General Questions',
      'booking': 'Booking & Reservations',
      'payment': 'Payment & Pricing',
      'vehicles': 'Vehicles & Options',
      'tours': 'Tours & Experiences'
    };
    return labels[category] || category;
  }
}
