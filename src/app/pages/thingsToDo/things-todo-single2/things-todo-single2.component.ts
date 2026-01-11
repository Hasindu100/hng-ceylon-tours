import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThingsTodoService } from 'src/app/services/things-todo.service';

@Component({
  selector: 'app-things-todo-single2',
  templateUrl: './things-todo-single2.component.html',
  styleUrls: ['./things-todo-single2.component.scss']
})
export class ThingsTodoSingle2Component {
  thingsTodoId: string = '';
  thingsTodoDetails: any;
  bannerImage: string = 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';

  breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Tour', link: '/tours' },
    { label: 'Wildlife Tours', link: '/tours/wildlife' },
    { label: 'Wildlife Tour', link: null }
  ];

  constructor(private thingsTodoService: ThingsTodoService,
    private route: ActivatedRoute) {
      this.route.queryParams.subscribe((val: any) => {
        if (val.id) {
          this.thingsTodoId = val.id;
          this.thingsTodoService.getThingsTodoById(this.thingsTodoId).then((res: any) => {
            if (res) {
              this.thingsTodoDetails = res.data();
              if (this.thingsTodoDetails?.images.length > 0) {
                this.bannerImage = this.thingsTodoDetails?.images[0];
              }
            }
          });
        }
      });
  }
  
  onExploreMore(): void {
    console.log('Explore More clicked');
    // Add your navigation logic here
  }

  onBookTour(): void {
    console.log('Book This Tour clicked');
    // Add your booking logic here
  }
}
