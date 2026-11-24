import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  public getTours = new Subject<any>();
  getTours$ = this.getTours.asObservable();
  airportPickupTourInfo: any;

  constructor(private fs: Firestore, private loaderService: LoaderService) { }

  getAllTours() {
    let tourCollection = collection(this.fs, 'tours');
    return this.loaderService.trackObservable(() => collectionData(tourCollection, {idField: 'id'}));
  }

  getTourDetailsById(id: any) {
    let tourDoc = doc(this.fs, `tours/${id}`);
    return this.loaderService.trackPromise(() => getDoc(tourDoc));
  }

  getTourTypes() {
    let tourTypesCollection = collection(this.fs, 'tourTypes');
    return this.loaderService.trackObservable(() => collectionData(tourTypesCollection, {idField: 'id'}));
  }

  getToursByTourTypeId(tourTypeId: any) {
    let toursCollection = collection(this.fs, 'tours');
    const q = query(toursCollection, where('tourType.tourTypeId', '==', tourTypeId));
    return this.loaderService.trackObservable(() => collectionData(q, {idField: 'id'}));
  }

  getTourTypeDataById(tourTypeId: any) {
    let tourTypeDoc = doc(this.fs, `tourTypes/${tourTypeId}`);
    return this.loaderService.trackPromise(() => getDoc(tourTypeDoc));
  }
}
