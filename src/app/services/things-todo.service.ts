import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, getDoc, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ThingsTodoService {

  constructor(private fs: Firestore) { }

  getAllThingsTodoList() {
    let thingsTodoCollection = collection(this.fs, 'thingsTodo');
    return collectionData(thingsTodoCollection, { idField: 'id' });

    // const querySnapshot = await getDocs(thingsTodoCollection);
    // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  getThingsTodoById(id: any) {
    let thingsTodoDoc = doc(this.fs, `thingsTodo/${id}`);
    return getDoc(thingsTodoDoc);
  }
}
