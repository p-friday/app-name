import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AuthProvider from "../Auth/AuthProvider";
import { Place, Trip, TripPlace } from "../../types";
import { Autocomplete, GoogleMap, useLoadScript } from "@react-google-maps/api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const libraries = ["places"];

const Schedule = () => {
  const auth = AuthProvider();
  const { id } = useParams();
  const location = useLocation();

  const { isLoaded, loadError } = useLoadScript({
    //id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    // @ts-ignore
    libraries: libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const [tripData, setTripData] = useState<Trip | null>(null);
  const [tripPlaces, setTripPlaces] = useState<TripPlace[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [destination, setDestination] = useState<string>("");
  const [category, setCategory] = useState<string>("tourist attraction");
  const [radius, setRadius] = useState<number>(100);
  const [open, setOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState("Result: none");
  const [placeId, setPlaceId] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [askDate, setAskDate] = useState<boolean>(false);
  const [error, setError] = useState<any>("");
  const [mapOpen, setMapOpen] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<any>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    getTrip();
    if (tripData?.destination) {
      setDestination(tripData?.destination);
    }
  }, []);

  async function getTrip() {
    const response = await fetch(`http://tripplaner.somee.com/api/Trip/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${auth.Authorization}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json);
    } else {
      setTripData(json);
      setTripPlaces(json.places);
      console.log("gettripfunc");
    }
  }

  useEffect(() => {
    if (tripData && tripData.places.length === 0) {
      async function getPlaces() {
        // console.log(`getplacesfunc: ${tripData?.destination}`);
        const response = await fetch(
          `http://tripplaner.somee.com/api/Places?category=${category}&placename=${tripData?.destination}&radius=${radius}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${auth.Authorization}`,
            },
          },
        );
        const json = await response.json();
        if (!response.ok) {
          setError(json);
        } else {
          setPlaces(json);
        }
      }

      getPlaces();
    } else if (tripData) {
      setDestination(tripData.destination);
      //console.log(tripData?.places);
    }
  }, [tripData]);

  if (!tripData) {
    return <div>Loading...</div>;
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function onLoad(autocomplete: any) {
    setSearchResults(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResults != null) {
      // @ts-ignore
      const place = searchResults.getPlace();
      setPlaceId(place.place_id);
      console.log(placeId);
    }
  }

  async function addNewPlace(event: any) {
    event.preventDefault();

    const response = await fetch(
      `http://tripplaner.somee.com/api/Trip/addPlace?tripPlanId=${id}&placeId=${placeId}&chosenDate=${date}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${auth.Authorization}`,
        },
      },
    );

    if (!response.ok) {
      console.log(response);
      const json = await response.json();
      console.log(json);
      setError(json);
    } else {
      getTrip();
      setOpen(false);
      setAskDate(false);
      event.target.reset();
    }
  }

  async function searchForPlaces(event: any) {
    event.preventDefault();

    setLoading(true);

    const response = await fetch(
      `http://tripplaner.somee.com/api/Places?category=${category}&placename=${destination}&radius=${radius}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${auth.Authorization}`,
        },
      },
    );
    const json = await response.json();
    if (!response.ok) {
      setError(json);
    } else {
      setPlaces(json);
    }
    setLoading(false);
  }

  function handleAskDate(place: Place) {
    setAskDate(true);
    setPlaceId(place.placeId);
  }

  function handleCancel() {
    setAskDate(false);
  }

  async function handleRemove(place_id: number) {
    const response = await fetch(
      `http://tripplaner.somee.com/api/Trip/place/${place_id}/plan/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${auth.Authorization}`,
        },
      },
    );
    //const json = await response.json();
    if (!response.ok) {
      console.log(response);
      //setError(json);
    } else {
      console.log(response);
      //console.log(json);
      setTripPlaces(tripPlaces.filter((place) => place.id !== place_id));
    }
  }

  function showMap() {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
    setMapOpen(true);
  }

  function closeMap() {
    setMapOpen(false);
  }

  const startDate = new Date(tripData?.startDate);
  const endDate = new Date(tripData?.endDate);
  endDate.setHours(23, 59, 59, 999);
  const diffDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const days = Array.from(
    { length: diffDays },
    (_, i) => new Date(startDate.getTime() + i * 1000 * 60 * 60 * 24),
  );
  //console.log("after setting days");

  return (
    <div className="flex flex-col items-stretch px-2">
      <h1 className="text-3xl font-bold text-black">
        {tripData.destination} trip schedule
      </h1>
      <div className="flex align-start">
        <div className="w-1/4 bg-gray-700 py-3 rounded-xl">
          <button
            onClick={handleOpen}
            className="bg-green-400 hover:bg-green-700 text-black font-bold py-2 px-4 mx-1 rounded"
          >
            Add Place
          </button>
          <button
            onClick={showMap}
            className="bg-blue-400 hover:bg-blue-700 text-black font-bold py-2 px-4 mx-1 rounded"
          >
            whats near me
          </button>
          <div className={`modal ${mapOpen ? "open" : ""}`}>
            <div className="modal-content">
              <h2 id="form-dialog-title">Map</h2>
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={mapStyles}
                  zoom={13}
                  center={currentLocation}
                />
              ) : (
                <p>coudn't load google maps</p>
              )}
              <button onClick={closeMap}>Close</button>
            </div>
          </div>
          <div className={`modal ${open ? "open" : ""}`}>
            <div className="modal-content">
              <h2 id="form-dialog-title">Add new place</h2>
              <div>
                {isLoaded ? (
                  <form onSubmit={addNewPlace}>
                    <Autocomplete
                      onLoad={onLoad}
                      onPlaceChanged={onPlaceChanged}
                    >
                      <input type="text" placeholder="search for place" />
                    </Autocomplete>
                    <input
                      type="datetime-local"
                      min={startDate.toISOString().substring(0, 16)}
                      max={endDate.toISOString().substring(0, 16)}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <button type="submit">Add</button>
                  </form>
                ) : (
                  <p>coudn't load google maps</p>
                )}
                <button onClick={handleClose}>Cancel</button>
              </div>
            </div>
            budiv
          </div>
          <p className="text-white">or</p>
          <h3 className="text-white">Look for more places</h3>
          <form onSubmit={searchForPlaces} className="text-white">
            <label>
              destination:
              <input
                type="text"
                placeholder="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="border-2 border-gray-300 text-black p-1 rounded-md mb-2"
              />
            </label>
            <label>
              category:
              <input
                type="text"
                placeholder="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border-2 border-gray-300 text-black p-1 rounded-md mb-2"
              />
            </label>
            <label>
              search radius:
              <input
                type="number"
                placeholder="radius"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="border-2 border-gray-300 text-black p-1 rounded-md mb-2"
              />
            </label>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded"
            >
              Search
            </button>
          </form>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div id="places" className="text-white">
              places:
              {places.map((place, index) => (
                <div
                  key={index}
                  className="bg-gray-200 border-2 border-black text-black rounded-md my-2 mx-3 p-1"
                >
                  <h4>name: {place.name}</h4>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                    onClick={() => handleAskDate(place)}
                  >
                    Add
                  </button>
                </div>
              ))}
              <div className={`modal ${askDate ? "open" : ""}`}>
                <div className="modal-content text-black">
                  <h2 id="form-dialog-title">When would you like to visit?</h2>
                  <div>
                    <form onSubmit={addNewPlace}>
                      <label>
                        date:
                        <input
                          type="datetime-local"
                          min={startDate.toISOString().substring(0, 16)}
                          max={endDate.toISOString().substring(0, 16)}
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </label>
                      <button type="submit">Add</button>
                    </form>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex overflow-x-auto w-3/4">
          {days.map((day, index) => (
            <div
              key={index}
              className="flex flex-col w-1/4 m-2 border-2 border-black p-2 bg-gray-400"
            >
              <h2 className="font-bold">{day.toDateString()}</h2>
              {tripPlaces
                .filter(
                  (place) =>
                    new Date(place.chosenDay).toLocaleDateString() ===
                    day.toLocaleDateString(),
                )
                .sort(
                  (a, b) =>
                    new Date(a.chosenDay).getTime() -
                    new Date(b.chosenDay).getTime(),
                )
                .map((place, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 border-2 border-black m-1 p-2 rounded-md"
                  >
                    <h4 className="font-bold">{place.placeName}</h4>
                    <p>at: {place.chosenDay.split("T")[1]}</p>
                    <button
                      onClick={() => handleRemove(place.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
      <Dialog
        open={!!error}
        onClose={() => setError("")}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Something went wrong!</DialogTitle>
        <DialogContent id="alert-dialog-description">
          {error.message}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setError("")}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Schedule;
