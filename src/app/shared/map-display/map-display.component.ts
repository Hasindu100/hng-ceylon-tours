import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
    selector: 'app-map-display',
    templateUrl: './map-display.component.html',
    styleUrls: ['./map-display.component.scss'],
    standalone: true,
    imports: [
      CommonModule,
      GoogleMapsModule,
    ]
})
export class MapDisplayComponent {
  @Input('latitude') latitude: number = 6.9271;
  @Input('longitude') longitude: number = 79.8612;
  markers = [
    {
      position: { lat: this.latitude, lng: this.longitude },
      label: 'A',
      title: 'Colombo'
    }
  ];

}
