import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  apiKey: string = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImQyYmRkMTlhYTE4NTRhYmQ5NTlhMDNjMjUxM2EyNGNkIiwiaCI6Im11cm11cjY0In0';
  
  constructor(private fs: Firestore,
    private http: HttpClient) { }

  loadLocationData() {
    // Implementation for loading location data from Firestore
    let locationsCollection = collection(this.fs, 'locations');
    return collectionData(locationsCollection, { idField: 'id' });
  }

  searchLocations(searchTerm: string) {
    //var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(searchTerm) + '.json?access_token=YOUR_MAPBOX_ACCESS_TOKEN';
    // var url = `https://api.openrouteservice.org/geocode/autocomplete` +
    //   `?api_key=${this.apiKey}=` +
    //   `&text=${searchTerm}` +
    //   `&boundary.country=LK`;

    var url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchTerm)}&countrycodes=lk&format=jsonv2`;

    return this.http.get(url);
  }

  getNearestRoad(lon: number, lat: number) {
    return this.http.get(`https://router.project-osrm.org/nearest/v1/driving/${lon},${lat}`);
  }

  getNearestRoad2(lon: number, lat: number) {
    var url = `https://api.openrouteservice.org/v2/snap/driving-car`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.apiKey}=`
    });

    const body = {
      "locations": [[79.87639904022218,7.160304532115036],[lon, lat]],
      "radius": 1500,
    };

    return this.http.post(url, body, { headers: headers });
  }

  getRouteDrivingData(start: [number, number], end: [number, number]) {
    var url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${this.apiKey}=` +
      `&start=${start[0]},${start[1]}` +
      `&end=${end[0]},${end[1]}`;

    const headers = new HttpHeaders({
      'Accept': 'application/json'
    });

    return this.http.get(url, { 'headers': this.serviceheader() });
  }

  serviceheader() : any {
    return { 'content-type': 'application/json', 'Authorization': this.apiKey };
  }
}
