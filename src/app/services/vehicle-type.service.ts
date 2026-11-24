import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  constructor(private fs: Firestore, private loaderService: LoaderService) { }

  getVehicleTypes() {
    let vehicleTypesCollection = collection(this.fs, 'vehicleTypes');
    return this.loaderService.trackObservable(() => collectionData(vehicleTypesCollection, {idField: 'id'}));
  }
}
