import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private fs: Firestore, private loaderService: LoaderService) { }

  savePaymentData(paymentData: any) {
    let paymentsCollection = collection(this.fs, 'payments');
    return this.loaderService.trackPromise(() => addDoc(paymentsCollection, paymentData));
  }
}
