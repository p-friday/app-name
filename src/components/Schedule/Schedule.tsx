import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AuthProvider from "../Auth/AuthProvider";
import { Place, Trip } from "../../types";
import { Autocomplete, useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const Schedule = () => {
  const auth = AuthProvider();
  const { id } = useParams();
  const location = useLocation();

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAPS_API_KEY,
    // @ts-ignore
    libraries: libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  const [tripData, setTripData] = useState<Trip | null>(null);
  //const [tripPlaces, setTripPlaces] = useState<TripPlace[]>([]);
  const [places, setPlaces] = useState<Place[]>([]);
  const [destination, setDestination] = useState<string>("");
  const [category, setCategory] = useState<string>("tourist attraction");
  const [radius, setRadius] = useState<number>(100);
  const [open, setOpen] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState("Result: none");
  const [placeId, setPlaceId] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    if (location.state) {
      setDestination(location.state.destination);
    }
    async function getTrip() {
      const response = await fetch(
        `http://tripplaner.somee.com/api/Trip/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${auth.Authorization}`,
          },
        },
      );
      const json = await response.json();
      setTripData(json);
      //console.log("gettripfunc");
    }

    getTrip();
  }, []);

  useEffect(() => {
    if (tripData && tripData.places.length === 0) {
      async function getPlaces() {
        //console.log(`getplacesfunc: ${destination}`);
        if (destination) {
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
          setPlaces(json);
        }
      }

      getPlaces();
    } else {
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
      //console.log(place);
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
    }

    //console.log(response);
    //const json = await response.json();
    //console.log(json);
  }

  async function searchForPlaces(event: any) {
    event.preventDefault();
  }

  async function addToSchedule(event: any) {
    event.preventDefault();
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
    <div className="flex flex-col items-stretch">
      <h1>Schedule</h1>
      <div className="flex">
        <div className="w-1/4">
          <button onClick={handleOpen}>Add Place</button>
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
          </div>
          <p>or</p>
          <h3>Look for more places</h3>
          <form onSubmit={searchForPlaces}>
            <label>
              destination:
              <input
                type="text"
                placeholder="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </label>
            <label>
              category:
              <input
                type="text"
                placeholder="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </label>
            <label>
              search radius:
              <input
                type="number"
                placeholder="radius"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
              />
            </label>
            <button type="submit">Search</button>
          </form>
          <div id="places">
            places:
            {places.map((place, index) => (
              <div key={index} className="bg-gray-200 border-2 border-black">
                <h4>name: {place.name}</h4>
                <button className="" onClick={addToSchedule}>
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex overflow-x-auto w-3/4">
          {days.map((day, index) => (
            <div
              key={index}
              className="w-1/4 m-2 border-2 border-black p-2 bg-gray-400"
            >
              <h2>{day.toDateString()}</h2>
              {tripData.places
                .filter(
                  (place) =>
                    new Date(place.chosenDay).toLocaleDateString() ===
                    day.toLocaleDateString(),
                )
                .map((place, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 border-2 border-black"
                  >
                    <h4>name: {place.apiPlaceId}</h4>
                    <p>time: {place.chosenDay.split("T")[1]}</p>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
