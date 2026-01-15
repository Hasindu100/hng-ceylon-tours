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