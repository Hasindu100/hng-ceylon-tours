import { Component, OnInit } from '@angular/core';
import { ThingsTodoService } from 'src/app/services/things-todo.service';

@Component({
  selector: 'app-things-todo-main',
  templateUrl: './things-todo-main.component.html',
  styleUrls: ['./things-todo-main.component.scss']
})
export class ThingsTodoMainComponent implements OnInit {
  thingsTodoList: any[] = [];
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

  constructor(private thingsTodoService: ThingsTodoService) { }

  ngOnInit(): void {
    this.getAllThingsTodoList();
  }

  getAllThingsTodoList() {
    this.thingsTodoService.getAllThingsTodoList().subscribe((res: any) => {
      this.thingsTodoList = res;
    });
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

  getContent(content: string) {
    return content.replace(/<[^>]*>/g, '');
  }
}

export interface TourCard {
  id: number;
  title: string;
  startingPrice: string;
  imageUrl: string;
  altText: string;
}
