export interface SearchFormData {
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
}