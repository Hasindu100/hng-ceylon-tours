import { Component, OnInit } from '@angular/core';
import { ThingsTodoService } from 'src/app/services/things-todo.service';

@Component({
  selector: 'app-things-to-do',
  templateUrl: './things-to-do.component.html',
  styleUrls: ['./things-to-do.component.scss']
})
export class ThingsToDoComponent implements OnInit {
  destinations: Destination[] = [
    {
      id: 1,
      title: 'Ella, Sri Lanka',
      image: 'assets/images/todo/todo-1.jpg',
      alt: 'Ella Sri Lanka mountain view',
      span: 'col-span-1'
    },
    {
      id: 2,
      title: 'Polonnaruwa The Medieval Kingdom',
      image: 'assets/images/todo/todo-3.jpg',
      alt: 'Polonnaruwa medieval ruins',
      span: 'col-span-1'
    },
    {
      id: 3,
      title: 'Sigiriya - The Rock Fortress In The Sky',
      image: 'assets/images/todo/todo-2.jpg',
      alt: 'Sigiriya rock fortress',
      span: 'col-span-2'
    },
    {
      id: 4,
      title: 'Yala National Park',
      image: 'assets/images/todo/todo-4.jpg',
      alt: 'Yala National Park leopard',
      span: 'col-span-1'
    }
  ];

  thingsTodoList: any[] = [];
  selectedIdsList: string[] = ['4662bH1CO11hqxfB183H', 'AiY9ASH4847Lw0CXRlAP', 'JyLOogSmCdiKAhekYvsA', 'MgXs96icsizkeu4xWhEl'];

  constructor(private thingsTodoService: ThingsTodoService) { }

  ngOnInit(): void {
    this.getAllThingsTodoList();
  }

  onDestinationClick(destination: Destination): void {
    console.log('Destination clicked:', destination.title);
    // Add your navigation logic here
  }

  onDestinationHover(destination: Destination): void {
    // Add hover analytics or effects here
  }

  getAllThingsTodoList() {
    this.thingsTodoService.getAllThingsTodoList().subscribe((res: any) => {
      this.thingsTodoList = res;
      this.thingsTodoList = this.thingsTodoList.filter((item: any) => this.selectedIdsList.includes(item.id));
    });
  }

  getImageURl(imagePaths: string[]) {
    var imageUrl = 'assets/images/placeholder-image.jpg';
    if (imagePaths.length > 0) {
      imageUrl = imagePaths[0];
    }
    return imageUrl
  }
}
  
export interface Destination {
  id: number;
  title: string;
  image: string;
  alt: string;
  span?: 'col-span-1' | 'col-span-2';
}
