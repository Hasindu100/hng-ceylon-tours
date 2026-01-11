import { Component, Input } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.scss']
})
export class TourDetailsComponent {
  @Input() tourData: TourDetails | null = null;

  map!: L.Map;
  routeLayer?: L.Polyline;
  startMarker?: L.Marker;
  endMarker?: L.Marker;

  // Defaults: Kandy (Temple of the Tooth) to Matara area
  fromLon = 80.7718;
  fromLat = 7.2906;
  toLon = 80.547739;
  toLat = 5.948509;

  distanceKm: number | null = null;
  durationMin: number | null = null;
  apiKey: string = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImQyYmRkMTlhYTE4NTRhYmQ5NTlhMDNjMjUxM2EyNGNkIiwiaCI6Im11cm11cjY0In0';
  
  sampleTourData: TourDetails = {
    pickupLocation: 'Bandaranaike International Airport',
    dropLocation: 'Sigiriya Rock Fortress',
    distance: 148.5,
    duration: 195,
    price: 12500,
    mapRoute: {
      coordinates: [
        { lat: 7.1807, lng: 79.8844 },
        { lat: 7.2906, lng: 80.5209 },
        { lat: 7.9570, lng: 80.7603 }
      ]
    }
  };

  isVisible = false;
  hasData: boolean = false;
  priceRatePerKM: number = 0.4; // USD per kilometer
  isLoading: boolean = false;

  constructor(private commonService: CommonService) { }

  ngAfterViewInit() {
    
  }

  ngAfterViewChecked() {
    setTimeout(() => {
      this.initializeMap();
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

      // Initial markers
      this.startMarker = L.marker([this.fromLat, this.fromLon]).addTo(this.map);
      this.endMarker = L.marker([this.toLat, this.toLon]).addTo(this.map);
    }
  }

  ngOnInit(): void {
    this.commonService.loadTourDetails$.subscribe((data) => {
      this.tourData = {
        pickupLocation: data.pickupLocation,
        dropLocation: data.destination,
        distance: 150, // Placeholder, should be calculated
        duration: 180, // Placeholder, should be calculated
        price: 10000, // Placeholder, should be calculated
        mapRoute: undefined
      };
      this.fromLon = data.pickupLonLang[0];
      this.fromLat = data.pickupLonLang[1];
      this.toLon = data.destinationLonLang[0];
      this.toLat = data.destinationLonLang[1];
      this.hasData = true;
      this.isLoading = true;
      this.drawRoute2();
    });
    // Use sample data if no input provided
    // if (!this.tourData) {
    //   this.tourData = this.sampleTourData;
    // }
    
    // Trigger animation
    setTimeout(() => {
      this.isVisible = true;
    }, 100);
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = (minutes % 60).toFixed(0);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0
    }).format(price);
  }


  calculatePricePerKm(): any {
    if (this.tourData) {
      const pricePerKm = this.tourData.distance * this.priceRatePerKM;
      return pricePerKm.toFixed(2);
    }
    return 0;
  }

  async drawRoute2(): Promise<void> {
    // Clean previous
    this.routeLayer?.remove(); this.routeLayer = undefined;
    this.startMarker?.remove(); this.startMarker = undefined;
    this.endMarker?.remove(); this.endMarker = undefined;
    this.distanceKm = null; this.durationMin = null;

    try {
      // ORS needs [lon, lat]
      const start: [number, number] = [this.fromLon, this.fromLat];
      const end:   [number, number] = [this.toLon, this.toLat];

      const { latLngs, distanceKm, durationMin } = await this.routeDriving([this.fromLon, this.fromLat], [this.toLon, this.toLat]);
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
      const startLatLng = latLngs[0];
      const endLatLng = latLngs[latLngs.length - 1];
      this.startMarker = L.marker(startLatLng).addTo(this.map).bindPopup('Start');
      this.endMarker = L.marker(endLatLng).addTo(this.map).bindPopup('End');
      
      // Show metrics
      this.distanceKm = distanceKm;
      this.durationMin = durationMin;
      this.tourData!.distance = distanceKm;
      this.tourData!.duration = durationMin;
      this.tourData!.price = this.calculatePricePerKm();
    } catch (err: any) {
      console.error(err);
      alert(err?.message ?? 'Routing failed. Check coordinates and API key.');
    }
  }

  async routeDriving(start: [number, number], end: [number, number]): Promise<RouteResult> {
    const body = {
        coordinates: [start, end],
        // profile can be 'driving-car', 'driving-hgv', 'cycling-regular', 'foot-walking', etc.
        format: 'json'
      };
      const res = await fetch('https://api.openrouteservice.org/v2/directions/driving-car?api_key=eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImQyYmRkMTlhYTE4NTRhYmQ5NTlhMDNjMjUxM2EyNGNkIiwiaCI6Im11cm11cjY0In0=&start=80.497346,5.941968&end=6.9270786,79.861243', {
        method: 'POST',
        headers: {
          'Authorization': this.apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

    if (!res.ok) {
      throw new Error(`ORS error ${res.status}: ${await res.text()}`);
    }

    const json = await res.json();
    const route = json?.routes?.[0];
    if (!route) throw new Error('No route found');

    const km = (route.summary?.distance ?? 0) / 1000;
    const min = (route.summary?.duration ?? 0) / 60;

    // const coords = route.geometry?.coordinates as [number, number][];
    // if (!Array.isArray(coords)) throw new Error('Geometry coordinates missing');

    //const latLngs: [number, number][] = coords.map(([lon, lat]) => [lat, lon]);
    const latLngs: [number, number][] = [[this.fromLat, this.fromLon], [this.toLat, this.toLon]];
    this.isLoading = false;
    return { distanceKm: km, durationMin: min, latLngs };
  }
}

export interface TourDetails {
  pickupLocation: string;
  dropLocation: string;
  distance: number; // in kilometers
  duration: number; // in minutes
  price: number;
  mapRoute?: {
    coordinates: { lat: number; lng: number }[];
  };
}

export interface RouteResult {
  distanceKm: number;
  durationMin: number;
  latLngs: [number, number][]; // Leaflet-ready [lat, lon] pairs
  bbox?: number[];
}
