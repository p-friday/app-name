import { Link } from "react-router-dom";
import { Trip } from "../../types";
import AuthProvider from "../Auth/AuthProvider";

interface Props {
  schedule: Trip;
  onDelete: (id: number) => void;
}

const ScheduleListItem = ({ schedule, onDelete }: Props) => {
  const startDate = new Date(schedule.startDate);
  const endDate = new Date(schedule.endDate);
  endDate.setHours(23, 59, 59, 999);
  const diffDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  function handleDelete(event: any) {
    event.preventDefault();
    event.stopPropagation();

    onDelete(schedule.id);
  }

  return (
    <Link to={`/schedule/${schedule.id}`} className="border-black border-2">
      <h1>destination</h1>
      <h2>
        <b>from:</b> {startDate.toDateString()}, <b>to:</b>{" "}
        {endDate.toDateString()}
      </h2>
      <p>duration: {diffDays} days</p>
      <button onClick={(e) => handleDelete(e)}>Delete</button>
    </Link>
  );
};

export default ScheduleListItem;
