import { Component, OnInit } from '@angular/core';

interface TermsSection {
  id: number;
  title: string;
  content: string[];
  subsections?: TermsSubsection[];
}

interface TermsSubsection {
  title: string;
  content: string[];
}

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit {
  lastUpdated: string = 'January 2024';
  
  termsSections: TermsSection[] = [
    {
      id: 1,
      title: '1. Acceptance of Terms',
      content: [
        'By accessing and using GetYourCab\'s website, mobile application, and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to any part of these terms, you must not use our services.',
        'GetYourCab reserves the right to modify, amend, or update these terms at any time without prior notice. Your continued use of our services following any changes constitutes your acceptance of the new terms. We recommend reviewing these terms regularly to stay informed of any updates.'
      ]
    },
    {
      id: 2,
      title: '2. Definitions',
      content: [],
      subsections: [
        {
          title: 'Service',
          content: ['Refers to transportation services including airport transfers, city tours, and customized travel packages offered by GetYourCab.']
        },
        {
          title: 'User/Customer',
          content: ['Any individual or entity that uses GetYourCab\'s services, either directly or indirectly through an authorized representative.']
        },
        {
          title: 'Platform',
          content: ['Our website, mobile application, and any other digital channels through which we offer our services.']
        },
        {
          title: 'Vehicle',
          content: ['Any transportation vehicle provided by GetYourCab for the delivery of our services.']
        },
        {
          title: 'Driver',
          content: ['Professionals employed or contracted by GetYourCab to operate vehicles and provide services to customers.']
        }
      ]
    },
    {
      id: 3,
      title: '3. Service Terms',
      content: [],
      subsections: [
        {
          title: 'Service Availability',
          content: [
            'GetYourCab operates services 24/7 throughout Sri Lanka. However, service availability may vary based on demand, weather conditions, or unforeseen circumstances.',
            'We reserve the right to suspend or terminate services in specific areas or during emergency situations without prior notice.'
          ]
        },
        {
          title: 'Age and Capacity Requirements',
          content: [
            'Users must be at least 18 years old to book services. For passengers under 18, parental or guardian consent is required.',
            'By booking our services, you confirm that you are physically and mentally capable of undertaking the journey and have no medical conditions that would prevent safe travel.'
          ]
        },
        {
          title: 'Special Requirements',
          content: [
            'If you require special assistance (wheelchair accessibility, mobility aids, specific vehicle types), please inform us during booking so we can arrange appropriate vehicles and notify your driver in advance.',
            'GetYourCab will make reasonable efforts to accommodate special requirements within available resources.'
          ]
        }
      ]
    },
    {
      id: 4,
      title: '4. Booking and Reservation',
      content: [],
      subsections: [
        {
          title: 'Booking Process',
          content: [
            'Booking can be completed through our website, mobile app, or by contacting our customer service team directly.',
            'To complete a booking, you must provide accurate personal information, contact details, and journey information.',
            'A booking confirmation will be sent to your email and/or phone number provided during the booking process.'
          ]
        },
        {
          title: 'Booking Confirmation',
          content: [
            'A booking confirmation does not guarantee service until payment has been received and processed successfully.',
            'GetYourCab reserves the right to reject any booking that appears fraudulent, incomplete, or violates these terms.',
            'Confirmed bookings will display all relevant details including date, time, vehicle type, driver information, and pricing.'
          ]
        },
        {
          title: 'Modification of Bookings',
          content: [
            'Bookings can be modified up to 24 hours before the scheduled service time without additional charges.',
            'Modifications made within 24 hours of the scheduled time may incur additional fees or may not be possible depending on availability.',
            'To modify a booking, log into your account, contact customer service, or call our hotline.'
          ]
        }
      ]
    },
    {
      id: 5,
      title: '5. Cancellation Policy',
      content: [],
      subsections: [
        {
          title: 'Free Cancellation',
          content: [
            'Cancellations made more than 24 hours before the scheduled service time will receive a full refund with no penalties.',
            'No questions asked - simply cancel through your account dashboard or by contacting our support team.'
          ]
        },
        {
          title: 'Cancellation Fee',
          content: [
            'Cancellations made between 12-24 hours before service will incur a 25% cancellation fee.',
            'Cancellations made between 2-12 hours before service will incur a 50% cancellation fee.',
            'Cancellations made less than 2 hours before service will incur a 75% cancellation fee.'
          ]
        },
        {
          title: 'No-Show Policy',
          content: [
            'If you fail to appear for your booked service, you will be charged 100% of the booking amount.',
            'The driver will wait for 15 minutes after the scheduled pickup time before considering it a no-show.',
            'We strongly recommend providing advance notice if you cannot make your appointment.'
          ]
        },
        {
          title: 'GetYourCab-Initiated Cancellation',
          content: [
            'In rare cases, GetYourCab may cancel a booking due to vehicle breakdown, driver unavailability, or force majeure events.',
            'In such cases, customers will receive a full refund and priority rebooking for an alternative date/time.'
          ]
        }
      ]
    },
    {
      id: 6,
      title: '6. Payment Terms',
      content: [],
      subsections: [
        {
          title: 'Payment Methods',
          content: [
            'GetYourCab accepts multiple payment methods including credit cards (Visa, Mastercard, American Express), debit cards, digital wallets, and bank transfers.',
            'All payments are processed securely through PCI-DSS compliant payment gateways.'
          ]
        },
        {
          title: 'Pricing and Quotes',
          content: [
            'Prices quoted during booking are estimates based on distance, time, and selected vehicle type.',
            'Final pricing may vary based on actual route, traffic conditions, and any additional services requested during the journey.',
            'Any discrepancies will be communicated to you before completion of payment.'
          ]
        },
        {
          title: 'Payment Due',
          content: [
            'Payment must be completed before or immediately after service delivery, depending on the payment method selected.',
            'Late payments may result in service suspension and collection actions as permitted by law.'
          ]
        },
        {
          title: 'Taxes and Fees',
          content: [
            'All advertised prices are inclusive of applicable taxes and government levies.',
            'Additional fees may apply for tolls, parking, or extra stops as agreed during booking.',
            'A detailed invoice will be provided showing the breakdown of all charges.'
          ]
        }
      ]
    },
    {
      id: 7,
      title: '7. Refund Policy',
      content: [],
      subsections: [
        {
          title: 'Refund Eligibility',
          content: [
            'Refunds are provided for cancellations made in accordance with our cancellation policy.',
            'Service-related refunds (incomplete service, driver behavior issues) may be approved on a case-by-case basis after investigation.',
            'Duplicate payment refunds will be processed if a payment was made more than once in error.'
          ]
        },
        {
          title: 'Refund Processing',
          content: [
            'Approved refunds will be processed to the original payment method within 5-7 business days.',
            'Processing time may vary depending on your financial institution.',
            'Refund requests must be submitted within 30 days of the transaction date.'
          ]
        },
        {
          title: 'Non-Refundable Items',
          content: [
            'Tips and gratuities to drivers are non-refundable.',
            'Completed services where you chose not to use the service after booking are non-refundable.',
            'Services cancelled due to customer negligence or failure to provide correct information are non-refundable.'
          ]
        }
      ]
    },
    {
      id: 8,
      title: '8. User Responsibilities',
      content: [],
      subsections: [
        {
          title: 'Accurate Information',
          content: [
            'You are responsible for providing accurate and complete information during booking.',
            'You must ensure that all passengers and luggage information is correct to avoid delays or service issues.',
            'Any inaccuracies causing service disruption may result in forfeiture of refunds.'
          ]
        },
        {
          title: 'Punctuality',
          content: [
            'Please be ready at the designated pickup location at least 5 minutes before the scheduled time.',
            'Delays in pickup location or unavailability at the scheduled time may result in additional charges.',
            'The driver will not wait indefinitely; extended waiting times incur extra charges.'
          ]
        },
        {
          title: 'Conduct During Service',
          content: [
            'Passengers must treat drivers and vehicles with respect.',
            'No smoking, drinking alcohol, or consuming food inside vehicles unless explicitly permitted.',
            'No loud music, aggressive behavior, or disruptive conduct is tolerated.',
            'Violation of conduct rules may result in immediate service termination and payment forfeiture.'
          ]
        },
        {
          title: 'Luggage and Belongings',
          content: [
            'GetYourCab is not responsible for loss, theft, or damage to personal belongings during service.',
            'You are responsible for ensuring your belongings are secured and accounted for.',
            'Report lost items to our support team immediately; we will make reasonable efforts to assist in recovery.'
          ]
        }
      ]
    },
    {
      id: 9,
      title: '9. Safety and Liability',
      content: [],
      subsections: [
        {
          title: 'Safety Compliance',
          content: [
            'All passengers must comply with safety regulations including the use of seatbelts.',
            'Drivers are trained in safety protocols and defensive driving techniques.',
            'GetYourCab maintains all vehicles according to government safety standards.'
          ]
        },
        {
          title: 'Accident and Damage',
          content: [
            'In case of an accident, passengers must remain calm and follow the driver\'s instructions.',
            'GetYourCab maintains comprehensive insurance coverage for all vehicles.',
            'Claims for passenger injuries or vehicle damage must be reported within 24 hours.',
            'Third-party liability claims should be directed to our insurance provider.'
          ]
        },
        {
          title: 'Limitation of Liability',
          content: [
            'GetYourCab is not liable for indirect, incidental, or consequential damages including loss of profits or business interruption.',
            'Our total liability shall not exceed the amount paid for the service in question.',
            'We are not liable for delays caused by traffic, weather, road conditions, or other force majeure events beyond our control.',
            'You assume all risks associated with using our services unless caused by our gross negligence or willful misconduct.'
          ]
        }
      ]
    },
    {
      id: 10,
      title: '10. Privacy and Data Protection',
      content: [
        'Your privacy is important to us. We collect and process personal data in accordance with applicable data protection laws.',
        'Personal information including name, contact details, and payment information is used solely for service delivery and improvement.',
        'We do not share personal data with third parties without your explicit consent, except where legally required or necessary for service delivery.',
        'Your data is protected using industry-standard security measures and encrypted communication protocols.',
        'For detailed information about how we handle your data, please refer to our Privacy Policy.'
      ]
    },
    {
      id: 11,
      title: '11. Intellectual Property',
      content: [
        'All content on the GetYourCab platform including text, images, logos, and designs is owned by GetYourCab or licensed partners.',
        'You may not reproduce, distribute, or modify any content without explicit written permission.',
        'Unauthorized use of our intellectual property may result in legal action.',
        'You grant GetYourCab the right to use feedback and suggestions you provide to improve our services.'
      ]
    },
    {
      id: 12,
      title: '12. Prohibited Activities',
      content: [
        'You may not use our platform for unlawful purposes or in violation of applicable laws.',
        'Harassment, discrimination, or abuse of drivers or other customers is strictly prohibited.',
        'You may not attempt to disrupt or interfere with the normal operation of our services.',
        'No spamming, hacking, or unauthorized access to our systems is permitted.',
        'Violating these provisions may result in account suspension or termination without refund.'
      ]
    },
    {
      id: 13,
      title: '13. Driver Conduct and Complaints',
      content: [],
      subsections: [
        {
          title: 'Driver Standards',
          content: [
            'All GetYourCab drivers are professionals trained in customer service, safety, and vehicle maintenance.',
            'Drivers are expected to treat all passengers with respect and professionalism.',
            'Drivers will not engage in harassment, discrimination, or inappropriate behavior.'
          ]
        },
        {
          title: 'Complaint Procedure',
          content: [
            'If you experience unsatisfactory driver conduct, please report it within 24 hours through your account or by contacting support.',
            'Provide detailed information including date, time, booking reference, and description of the incident.',
            'GetYourCab will investigate complaints and take appropriate action including driver retraining or termination if necessary.',
            'Valid complaints may result in service refunds or credits.'
          ]
        }
      ]
    },
    {
      id: 14,
      title: '14. Dispute Resolution',
      content: [],
      subsections: [
        {
          title: 'Informal Resolution',
          content: [
            'Any disputes arising from these terms should first be addressed through informal discussion with our customer service team.',
            'Most disputes can be resolved through email correspondence within 14 days.'
          ]
        },
        {
          title: 'Formal Grievance',
          content: [
            'If informal resolution fails, submit a formal written complaint to our customer care department.',
            'Formal complaints will be investigated and resolved within 30 days.',
            'You will receive a detailed explanation of the outcome and any remedies provided.'
          ]
        },
        {
          title: 'Legal Proceedings',
          content: [
            'These terms are governed by the laws of Sri Lanka.',
            'Any legal proceedings arising from these terms shall be subject to the jurisdiction of Sri Lankan courts.',
            'Both parties agree to attempt mediation before pursuing litigation.'
          ]
        }
      ]
    },
    {
      id: 15,
      title: '15. Limitation of Service',
      content: [
        'GetYourCab reserves the right to limit or terminate services to any user who violates these terms.',
        'Service may be suspended immediately in cases of fraud, violence, or threats.',
        'We are not obligated to provide services to anyone deemed a safety risk.',
        'Termination of service does not affect accumulated liabilities or obligations.'
      ]
    },
    {
      id: 16,
      title: '16. Force Majeure',
      content: [
        'GetYourCab shall not be liable for any failure or delay in service caused by circumstances beyond reasonable control including natural disasters, pandemics, war, terrorism, or civil unrest.',
        'In such events, we will make reasonable efforts to resume services and notify customers of any impacts.',
        'Force majeure events may result in service suspension, partial refunds, or rescheduling at no additional cost.'
      ]
    },
    {
      id: 17,
      title: '17. Changes to Terms',
      content: [
        'GetYourCab may update these Terms and Conditions at any time to reflect changes in our services, legal requirements, or business practices.',
        'Changes will be posted on our website with the updated date displayed.',
        'Continued use of our services following any changes constitutes acceptance of the new terms.',
        'We recommend reviewing these terms periodically to stay informed of any updates.',
        'For significant changes, we may provide additional notice via email.'
      ]
    },
    {
      id: 18,
      title: '18. Contact Information',
      content: [
        'For questions about these Terms and Conditions or our policies, please contact us:',
        'Email: support@getyourcab.com',
        'Phone: +94 (0) 11 XXX XXXX (24/7 Customer Support)',
        'Address: GetYourCab Headquarters, Colombo, Sri Lanka',
        'Website: www.getyourcab.com'
      ]
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  scrollToSection(sectionId: number): void {
    const element = document.getElementById(`section-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
