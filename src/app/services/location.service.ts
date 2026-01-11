import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private fs: Firestore) { }

  loadLocationData() {
    // Implementation for loading location data from Firestore
    let locationsCollection = collection(this.fs, 'locations');
    return collectionData(locationsCollection, { idField: 'id' });
  }
}
