import { CustomTourTypeVM } from "./BookingVM";

export interface TourDetails2 {
    pickupLocation: string, 
    destination: string,
    pickupLonLang: any,
    destinationLonLang: any,
    distanceKm: number,
    priceRatePerKM: number,
    totalTourPrice: number,
    date: Date,
    time: Date,
    vehicleTypeId: number
    vehicleType: string,
    adultCount: number,
    childCount: number,
    flightNumber: string,
    noOfDays: number,
    customTourType?: CustomTourTypeVM //this should be optional, only for custom tours
}