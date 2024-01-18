export type Trip = {
  id: number;
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
  apiPlaceId: string;
  tripPlanId: number;
  chosenDay: string;
};
