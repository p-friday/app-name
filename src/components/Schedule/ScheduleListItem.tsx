import { Link } from "react-router-dom";
import { Trip } from "../../types";

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
    <div className="inline-block my-2">
      <Link
        to={`/schedule/${schedule.id}`}
        className="inline-block border-black border-2 p-4 bg-gray-300 text-black rounded shadow hover:shadow-lg transition-shadow duration-200"
      >
        <h1 className="text-xl text-black font-bold mb-2">destination</h1>
        <h2 className="text-lg mb-2 text-black">
          <b>from:</b> {startDate.toDateString()}, <b>to:</b>{" "}
          {endDate.toDateString()}
        </h2>
        <p className="mb-2 text-black">duration: {diffDays} days</p>
        <button
          onClick={(e) => handleDelete(e)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </Link>
    </div>
  );
};

export default ScheduleListItem;
