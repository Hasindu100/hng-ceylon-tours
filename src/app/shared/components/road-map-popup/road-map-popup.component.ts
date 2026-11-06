import { CommonModule } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import type { Map, Marker, Polyline } from 'leaflet';

@Component({
    selector: 'app-road-map-popup',
    templateUrl: './road-map-popup.component.html',
    styleUrls: ['./road-map-popup.component.scss'],
    standalone: true,
    imports: [
      CommonModule
    ]
})
export class RoadMapPopupComponent implements OnInit, AfterViewInit, AfterViewChecked {
  map!: Map;
  L: any;
  showPopup = false;
  fromLon = 80.7718;
  fromLat = 7.2906;
  toLon = 80.547739;
  toLat = 5.948509;

  startMarker?: Marker;
  endMarker?: Marker;
  routeLayer?: Polyline;
  coffeeIcon: any;

  @Input() locationData: any = null;
  @Output() closeMapPopup: EventEmitter<void> = new EventEmitter<void>();

  get geometryData() {
    return this.locationService.geometryData;
  }

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    setTimeout(async () => {
      await this.initializeMap();
      this.drawRoute(this.locationData.pickupLocation, this.locationData.destination, this.locationData.pickupLatLang, this.locationData.destinationLatLang);
    }, 100);
  }

  async initializeMap() {
    const leafletModule = await import('leaflet');
    this.L = leafletModule.default ?? leafletModule;

    console.log("LEAFLET ",this.L);

    if (this.map) return; // Initialize only once

    const mapContainer = document.getElementById('map')!;
    if (mapContainer != null) {
      // Initialize map
      this.map = this.L.map('map').setView([this.fromLat, this.fromLon], 9);

      // OSM tiles (free)
      this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.map);
    }
  }

  closePopup() {
    this.showPopup = false;
    this.closeMapPopup.emit();
  }

  ngAfterViewInit() {
    
  }

  ngAfterViewChecked() {

  }

  async drawRoute(pickupLocation: string, destination: string, startLatLng: any, endLatLng: any): Promise<void> {
      // Clean previous
      this.routeLayer?.remove(); this.routeLayer = undefined;
      this.startMarker?.remove(); this.startMarker = undefined;
      this.endMarker?.remove(); this.endMarker = undefined;
  
      try {
        // ORS needs [lon, lat]
        const start: [number, number] = [this.fromLon, this.fromLat];
        const end:   [number, number] = [this.toLon, this.toLat];

        const latLngs: any = [startLatLng, endLatLng];

        const routeCoords = this.geometryData.map(
          ([lng, lat]: [number, number]) => [lat, lng]
        );

        this.routeLayer = this.L.polyline(routeCoords, {
          color: '#1976d2',
          weight: 6,
          opacity: 0.9
        }).addTo(this.map);
  
        this.startMarker = this.L.marker(startLatLng).addTo(this.map).bindPopup('Start');
        this.endMarker = this.L.marker(endLatLng).addTo(this.map).bindPopup('End');
  
        this.startMarker?.bindTooltip(pickupLocation, {
          permanent: true,     // 👈 keep it visible
          direction: 'top',    // 'top' | 'right' | 'left' | 'bottom' | 'center'
          offset: this.L.point(0, -8), // nudge the label slightly above the marker
          className: 'city-label' // custom CSS class (optional)
        });
  
        this.endMarker?.bindTooltip(destination, {
          permanent: true,
          direction: 'top',
          offset: this.L.point(0, -8),
          className: 'city-label'
        });
      } catch (err: any) {
        console.error(err);
        alert(err?.message ?? 'Routing failed. Check coordinates and API key.');
      }
    }

}