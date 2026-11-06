import { DocumentReference, Timestamp } from "@angular/fire/firestore";

export interface BookingVM {
    id?: string,
    userId: string,
    pickup: AddressPoint,
    dropoff: AddressPoint, 
    distanceKm: number | null,
    duration: number | null,
    totalPrice: number,
    amountPaid: number,
    remainingAmount: number,
    paymentStatus: number,
    paymentOption: number,
    date: Date,
    time: Date,
    vehicleTypeRef: DocumentReference
    vehicleType: VehicleTypeVM,
    adultCount: number,
    childCount: number,
    flightNumber: string,
    email: string,
    mobileNumber: number,
    firstName: string,
    lastName: string,
    country: string,
    status: number,
    tourType: TourTypeVM,
    createdAt: Date,
    updatedAt: Date,
    noOfDays?: number,
    customTourType?: CustomTourTypeVM //this should be optional, only for custom tours
}

export interface PaymentVM {
  id?: string;
  bookingId: string;
  amount: number;
  paymentMethod: number;
  transactionId: string;
  status: number;
  createdAt: Date;
}

export interface AddressPoint {
  address: string;
  lat: number;
  lng: number;
}


export interface VehicleTypeVM {
    id: string;
    vehicleTypeId: number;
    name: string;
    capacity: number;
    perKmRate: number;
    perMinuteRate: number;
    isActive: boolean;
    iconUrl?: string | null;
    images?: string[]; // Array of image URLs
}

export interface TourTypeVM {
  id: number,
  name: string
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'enroute'
  | 'completed'
  | 'cancelled'

export interface CheckoutItem {
  name: string;
  price: number;
  qty: number;
}

export interface CustomTourTypeVM {
  id: string,
  tourType: string
}