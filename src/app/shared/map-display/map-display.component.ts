import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.scss']
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
