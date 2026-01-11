import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tour } from 'src/app/models/tour';
import { ToursService } from 'src/app/services/tours.service';

interface TourHighlight {
  name: string;
}

interface TourImage {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-tours-single',
  templateUrl: './tours-single.component.html',
  styleUrls: ['./tours-single.component.scss']
})
export class ToursSingleComponent {
  duration = '10 Days / 09 Nights';
  tourType = 'General Tours';
  startingPrice = '$1080 USD';
  priceNote = 'Per person on double sharing basis';

  tourHighlights: TourHighlight[] = [
    { name: 'Kaudulla National Park Safari' },
    { name: 'Sigiriya Rock Fortress' },
    { name: 'Kandy Temple of the Tooth' },
    { name: 'Train Ride' },
    { name: 'Horton Plains Trekking' },
    { name: 'Little Adam\'s Peak' },
    { name: 'Yala National Park Safari' },
    { name: 'Bundala National Park Safari' },
    { name: 'Relax in the Beach' }
  ];

  tourImages: TourImage[] = [
    { src: 'assets/images/elephant-safari.jpg', alt: 'Elephant Safari' },
    { src: 'assets/images/sigiriya-rock.jpg', alt: 'Sigiriya Rock Fortress' },
    { src: 'assets/images/temple-kandy.jpg', alt: 'Temple of the Tooth Kandy' },
    { src: 'assets/images/waterfall.jpg', alt: 'Sri Lanka Waterfall' },
    { src: 'assets/images/elephant-park.jpg', alt: 'Elephant in National Park' },
    { src: 'assets/images/safari-vehicle.jpg', alt: 'Safari Vehicle' },
    { src: 'assets/images/leopard.jpg', alt: 'Sri Lankan Leopard' },
    { src: 'assets/images/ancient-ruins.jpg', alt: 'Ancient Ruins' },
    { src: 'assets/images/flamingos.jpg', alt: 'Flamingos in Bundala' }
  ];

  breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Tour', link: '/tours' },
    { label: 'Wildlife Tours', link: '/tours/wildlife' },
    { label: 'Wildlife Tour', link: null }
  ];

  tourId: number = 0;
  tourDetails: Tour = {
    title: '',
    price: 0,
    days: 0,
    highlight: [],
    tourType: {
      tourTypeId: 0,
      tourType: ''
    },
    content: '',
    tourImages: [],
    isFeatured: false,
    views: 0,
    createdAt: new Date()
  };

  headerBackgroundImageUrl: string = 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';

  constructor(private route: ActivatedRoute,
    private toursService: ToursService) {
    this.route.queryParams.subscribe((val: any) => {
      this.tourId = val.id;
      this.toursService.getTourDetailsById(this.tourId).then((tour: any) => {
        this.tourDetails = tour.data();
        this.getTourTypeData(this.tourDetails.tourType.tourTypeId);
      });
    });
  }

  getTourTypeData(tourTypeId: any) {
    this.toursService.getTourTypeDataById(tourTypeId).then((res: any) => {
      if (res) {
        var tourTypeData = res.data();
        if (tourTypeData?.tourTypeImage) {
          this.headerBackgroundImageUrl = tourTypeData?.tourTypeImage[0];
        }
      }
    });
  }

  onInquiryClick(): void {
    // Handle inquiry action
    console.log('Inquiry clicked');
  }

  onBookNowClick(): void {
    // Handle booking action
    console.log('Book now clicked');
  }
}
