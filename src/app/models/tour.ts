export interface Tour {
    title: string,
    price: number,
    days: number,
    highlight: string[],
    tourType: {
        tourTypeId: number,
        tourType: string
    },
    content: string,
    tourImages: string[],
    isFeatured: boolean,
    views: number,
    createdAt: Date
}

export interface LocationVM {
    pickupLocation: string,
    destination: string,
    pickupLonLang: [number, number],
    destinationLonLang: [number, number],
    pickupDate: Date,
    pickupTime: Date,
    noOfGuests: number,
    vehicleTypeId: number,
    vehicleTypeName: string
}

export interface CountryOption {
  name: string;      // "Sri Lanka"
  iso2: string;      // "LK"
  dialCode: string;  // "+94" (single preferred dial code)
  dialCodes: string[]; // all possible dial codes, e.g., ["+1 809","+1 829","+1 849"] for DO
  flagPng?: string;  // optional flag
}
export interface CountryOption2 {
  name: string;      // "Sri Lanka"
  id: string;      // "LK"
  dialCode: string;  // "+94" (single preferred dial code)
  flagPng?: string;  // optional flag
  iso2?: string;      // "LK"
}