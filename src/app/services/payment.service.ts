import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private fs: Firestore) { }

  savePaymentData(paymentData: any) {
    let paymentsCollection = collection(this.fs, 'payments');
    return addDoc(paymentsCollection, paymentData);
  }
}
