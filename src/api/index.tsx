import axios, { AxiosRequestConfig } from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng';

const options: AxiosRequestConfig = {
  url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
  params: {
    bl_latitude: '11.847676',
    tr_latitude: '12.838442',
    bl_longitude: '109.095887',
    tr_longitude: '109.149359',
  },
  headers: {
    'X-RapidAPI-Key': 'da1f718c35mshe9c3353845c354fp1c82c3jsnb274843b6482',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
  },
};

export const getPlacesData = async () => {
  try {
    const { data: { data } } = await axios.get(URL, options);

    return data;
  } catch (error) {
    console.error('Error fetching places data:', error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};