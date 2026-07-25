export interface TourDetails {
  pickupLocation: string;
  dropLocation: string;
  distance: number; // in kilometers
  duration: number; // in minutes
  price: number;
  mapRoute?: {
    coordinates: { lat: number; lng: number }[];
  };
  vehicleTypeId: number,
  vehicleTypeName: string,
  pickupDate: Date,
  pickupTime: Date,
  noOfGuests: number,
}