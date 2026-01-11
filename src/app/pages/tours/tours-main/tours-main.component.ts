import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToursService } from 'src/app/services/tours.service';

@Component({
  selector: 'app-tours-main',
  templateUrl: './tours-main.component.html',
  styleUrls: ['./tours-main.component.scss']
})
export class ToursMainComponent implements OnInit {
  tourCards: TourCard[] = [
    {
      id: 1,
      title: 'Maduru Oya National Park Safari',
      startingPrice: 'Starting From $140 USD pp',
      imageUrl: 'assets/images/hero/slide-1.jpg',
      altText: 'Elephants crossing road in Maduru Oya National Park'
    },
    {
      id: 2,
      title: 'Geragama Tea Factory',
      startingPrice: 'Starting From $30 Per Person',
      imageUrl: 'assets/images/hero/slide-2.jpg',
      altText: 'Tea pickers working in Sri Lankan tea plantation'
    },
    {
      id: 3,
      title: 'Ritigala Mountain',
      startingPrice: 'Starting From $95 USD pp',
      imageUrl: 'assets/images/hero/slide-3.jpg',
      altText: 'Mountain landscape view of Ritigala'
    }
  ];

  tourList: any[] = [];
  tourTypeId: string = '';

  constructor(private toursService: ToursService,
    private route: ActivatedRoute) {
      this.route.queryParams.subscribe((val: any) => {
        if (val.id) {
          this.tourTypeId = val.id;
          this.toursService.getToursByTourTypeId(this.tourTypeId).subscribe((res: any) => {
            this.tourList = res;
          });
          // this.toursService.getTours$.subscribe(() => {
          //   this.toursService.getToursByTourTypeId(this.tourTypeId).then((res: any) => {
          //     this.tourList = res;
          //   });
          // });
          // this.toursService.getTours.next(null);
        }
        else {
          this.getAllTours();
        }
      });
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    
  }

  getAllTours() {
    this.toursService.getAllTours().subscribe((res: any) => {
      this.tourList = res;
    })
  }

  trackByTourId(index: number, tour: TourCard): number {
    return tour.id;
  }

  onTourCardClick(tour: TourCard): void {
    console.log('Tour selected:', tour.title);
    // Implement navigation or modal logic here
  }

  onTourCardKeydown(event: KeyboardEvent, tour: TourCard): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onTourCardClick(tour);
    }
  }

  getImageURl(imagePaths: string[]) {
    var imageUrl = 'assets/images/placeholder-image.jpg';
    if (imagePaths.length > 0) {
      imageUrl = imagePaths[0];
    }
    return imageUrl
  }
}

export interface TourCard {
  id: number;
  title: string;
  startingPrice: string;
  imageUrl: string;
  altText: string;
}

