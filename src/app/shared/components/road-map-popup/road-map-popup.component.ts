import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-road-map-popup',
  templateUrl: './road-map-popup.component.html',
  styleUrls: ['./road-map-popup.component.scss']
})
export class RoadMapPopupComponent implements OnInit, AfterViewInit, AfterViewChecked {
  map!: L.Map;
  showPopup = false;
  fromLon = 80.7718;
  fromLat = 7.2906;
  toLon = 80.547739;
  toLat = 5.948509;

  startMarker?: L.Marker;
  endMarker?: L.Marker;
  routeLayer?: L.Polyline;
  coffeeIcon: any;

  @Input() locationData: any = null;
  @Output() closeMapPopup: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    setTimeout(() => {
      this.initializeMap();
      var p = [this.fromLat, this.fromLon];
      var d = [this.toLat, this.toLon];
      this.drawRoute(this.locationData.pickupLocation, this.locationData.destination, this.locationData.pickupLatLang, this.locationData.destinationLatLang);
    }, 100);
  }

  initializeMap(): void {
    if (this.map) return; // Initialize only once

    const mapContainer = document.getElementById('map')!;
    if (mapContainer != null) {
      // Initialize map
      this.map = L.map('map').setView([this.fromLat, this.fromLon], 9);

      // OSM tiles (free)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
    this.coffeeIcon = L.icon({
      iconUrl: 'assets/icons/marker-icon.png', // your image
      iconRetinaUrl: 'assets/icons/marker-icon.png', // optional retina
      iconSize: [20, 20],       // width, height of the image
      iconAnchor: [10, 20],     // point of the icon which will correspond to marker's location
      popupAnchor: [0, -40],    // point from which the popup should open relative to the iconAnchor
      tooltipAnchor: [0, -20]   // tooltip offset
    });
  }

  ngAfterViewChecked() {
    // setTimeout(() => {
    //   this.initializeMap();
    //   this.drawRoute(this.locationData.pickupLocation, this.locationData.destination, this.locationData.pickupLonLang, this.locationData.destinationLonLang);
    // }, 100);
  }

  async drawRoute(pickupLocation: string, destination: string, startLatLng: any, endLatLng: any): Promise<void> {
      // Clean previous
      this.routeLayer?.remove(); this.routeLayer = undefined;
      this.startMarker?.remove(); this.startMarker = undefined;
      this.endMarker?.remove(); this.endMarker = undefined;
  
      //this.removeOnlyMarkers();
  
      try {
        // ORS needs [lon, lat]
        const start: [number, number] = [this.fromLon, this.fromLat];
        const end:   [number, number] = [this.toLon, this.toLat];
  
        //const { latLngs, distanceKm, durationMin } = await this.routeDriving([this.fromLon, this.fromLat], [this.toLon, this.toLat]);
        const latLngs: any = [startLatLng, endLatLng];
        this.routeLayer = (L as any).Routing.control({
          waypoints: latLngs,
          routeWhileDragging: false,
          show: true,
          lineOptions: {
            styles: [
              { color: '#000', opacity: 0.15, weight: 10 }, // shadow
              { color: '#1976d2', opacity: 0.9, weight: 6 } // main highlight
            ]
          }
        }).addTo(this.map);
  
        // Add start/end markers
        // const startLatLng = latLngs[0];
        // const endLatLng = latLngs[latLngs.length - 1];
  
        this.startMarker = L.marker(startLatLng).addTo(this.map).bindPopup('Start');
        this.endMarker = L.marker(endLatLng).addTo(this.map).bindPopup('End');
  
        this.startMarker.bindTooltip(pickupLocation, {
          permanent: true,     // 👈 keep it visible
          direction: 'top',    // 'top' | 'right' | 'left' | 'bottom' | 'center'
          offset: L.point(0, -8), // nudge the label slightly above the marker
          className: 'city-label' // custom CSS class (optional)
        });
  
        this.endMarker.bindTooltip(destination, {
          permanent: true,
          direction: 'top',
          offset: L.point(0, -8),
          className: 'city-label'
        });
      } catch (err: any) {
        console.error(err);
        alert(err?.message ?? 'Routing failed. Check coordinates and API key.');
      }
    }

}