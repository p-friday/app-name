import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "../Auth/AuthProvider";
import { Trip } from "../../types";

const CreateNewSchedule = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [destination, setDestination] = useState("");

  const navigate = useNavigate();

  const auth = AuthProvider() ?? {};

  function test() {
    console.log(startDate);
    console.log(endDate);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();

    //http://tripplaner.somee.com/api/Trip/create?startDate=2024-01-15T12%3A11&endDate=2024-01-20T12%3A11
    const response = await fetch(
      `http://tripplaner.somee.com/api/Trip/create?startDate=${startDate}&endDate=${endDate}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${auth.Authorization}`,
        },
      },
    );

    const json: Trip = await response.json();

    navigate(`/schedule/${json.id}`, {
      state: { tripData: json, destination: destination },
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="flex items-center space-x-2">
          Destination:
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            className="border-2 border-gray-300 p-2 rounded-md"
          />
        </label>
        <label className="flex items-center space-x-2">
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="border-2 border-gray-300 p-2 rounded-md"
          />
        </label>
        <label className="flex items-center space-x-2">
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="border-2 border-gray-300 p-2 rounded-md"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create
        </button>
      </form>
      {/* <button onClick={test}>test</button> */}
    </>
  );
};

export default CreateNewSchedule;
