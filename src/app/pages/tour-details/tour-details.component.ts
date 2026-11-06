import { Component } from '@angular/core';

@Component({
    selector: 'app-tour-details',
    templateUrl: './tour-details.component.html',
    styleUrls: ['./tour-details.component.scss'],
    standalone: false
})
export class TourDetailsComponent {

}

export interface RouteResult {
  distanceKm: number;
  durationMin: number;
  latLngs: [number, number][]; // Leaflet-ready [lat, lon] pairs
  bbox?: number[];
}
