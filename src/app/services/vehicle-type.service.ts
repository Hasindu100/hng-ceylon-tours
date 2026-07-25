import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  constructor(private fs: Firestore) { }

  getVehicleTypes() {
    let vehicleTypesCollection = collection(this.fs, 'vehicleTypes');
    return collectionData(vehicleTypesCollection, {idField: 'id'});
  }
}
