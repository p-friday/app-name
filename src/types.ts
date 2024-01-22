export type Trip = {
  id: number;
  destination: string;
  accountId: number;
  isPublic: boolean;
  startDate: string;
  endDate: string;
  places: TripPlace[];
};

export type Place = {
  name: string;
  placeId: string;
  rating: number;
  formattedPhoneNumber: string;
  website: string;
  vicinity: string;
  opening_Hours: object;
  types: string[];
};

export type TripPlace = {
  id: number;
  placeName: string;
  apiPlaceId: string;
  tripPlanId: number;
  chosenDay: string;
};
