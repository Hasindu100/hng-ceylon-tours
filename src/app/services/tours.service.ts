import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  public getTours = new Subject<any>();
  getTours$ = this.getTours.asObservable();

  constructor(private fs: Firestore) { }

  getAllTours() {
    let tourCollection = collection(this.fs, 'tours');
    return collectionData(tourCollection, {idField: 'id'});
  }

  getTourDetailsById(id: any) {
    let tourDoc = doc(this.fs, `tours/${id}`);
    return getDoc(tourDoc);
  }

  getTourTypes() {
    let tourTypesCollection = collection(this.fs, 'tourTypes');
    return collectionData(tourTypesCollection, {idField: 'id'});
  }

  getToursByTourTypeId(tourTypeId: any) {
    let toursCollection = collection(this.fs, 'tours');
    const q = query(toursCollection, where('tourType.tourTypeId', '==', tourTypeId));
    return collectionData(q, {idField: 'id'});
  }

  getTourTypeDataById(tourTypeId: any) {
    let tourTypeDoc = doc(this.fs, `tourTypes/${tourTypeId}`);
    return getDoc(tourTypeDoc);
  }
}
