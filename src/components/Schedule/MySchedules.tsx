import { useEffect, useState } from "react";
import AuthProvider from "../Auth/AuthProvider";
import ScheduleListItem from "./ScheduleListItem";
import { Trip } from "../../types";

const MySchedules = () => {
  const auth = AuthProvider();

  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    getSchedules();
  }, []);

  async function getSchedules() {
    const response = await fetch("http://tripplaner.somee.com/api/Trip/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${auth.Authorization}`,
      },
    });
    const json = await response.json();

    setSchedules(json);
  }

  async function handleDelete(id: number) {
    const response = await fetch(`http://tripplaner.somee.com/api/Trip/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${auth.Authorization}`,
      },
    });

    if (response.ok) {
      setSchedules(schedules.filter((schedule: Trip) => schedule.id !== id));
    }
  }

  if (!auth.Authorization) {
    return <div>Not logged in</div>;
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold text-black">My Schedules</h1>
      {schedules.map((schedule: Trip) => (
        <ScheduleListItem
          key={schedule.id}
          schedule={schedule}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default MySchedules;
