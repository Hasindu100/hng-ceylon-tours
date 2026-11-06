import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, getDoc, query, serverTimestamp, updateDoc, where } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  showDateTimeEditPopup: boolean = false;
  bookingId: any;
  
  constructor(private fs: Firestore) { }

  saveBooking(bookingData: any) {
    let bookingCollection = collection(this.fs, 'bookings');
    return addDoc(bookingCollection, bookingData);
  }

  getBookingDetailsById(id: any) {
    let bookingDoc = doc(this.fs, `bookings/${id}`);
    return getDoc(bookingDoc);
  }

  getBookingDetailsByUserId(userId: any) {
    let bookingCollection = collection(this.fs, 'bookings');
    const q = query(bookingCollection, where('userId', '==', userId));
    return collectionData(q, {idField: 'id'});
  }

  updateBookingStatus(bookingId: any, status: number) {
    let bookingDoc = doc(this.fs, `bookings/${bookingId}`);
    return updateDoc(bookingDoc, { 
      status: status,
      paidAt: serverTimestamp()
    });
  }

  updatePaymentOption(bookingId: any, paymentOption: number) {
    let bookingDoc = doc(this.fs, `bookings/${bookingId}`);
    return updateDoc(bookingDoc, { 
      paymentOption: paymentOption,
      updatedAt: serverTimestamp()
    });
  }

  updateBookingPaymentData(bookingId: any, paymentData: any) {
    let bookingDoc = doc(this.fs, `bookings/${bookingId}`);
    return updateDoc(bookingDoc, { 
      ...paymentData
    });
  }

  updatePickupDateAndTime(bookingId: any, pickupData: any) {
    let bookingDoc = doc(this.fs, `bookings/${bookingId}`);
    return updateDoc(bookingDoc, { 
      ...pickupData
    });
  }
}
