import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ThingsTodoService {

  constructor(private fs: Firestore) { }

  getAllThingsTodoList() {
    let thingsTodoCollection = collection(this.fs, 'thingsTodo');
    return collectionData(thingsTodoCollection, { idField: 'id' });
  }

  getThingsTodoById(id: any) {
    let thingsTodoDoc = doc(this.fs, `thingsTodo/${id}`);
    return getDoc(thingsTodoDoc);
  }
}
