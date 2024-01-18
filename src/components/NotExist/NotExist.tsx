import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const NotExist = () => {
  const [cookies, ,] = useCookies(["user"]);
  const navigate = useNavigate();

  return (
    <>
      {cookies.user && (
        <>
          <div className="NotExist">
            <b>Not Found 404</b>
          </div>
        </>
      )}
      {!cookies.user && (
        <>
          <div className="NotExist">
            <b>You must be logged in</b>
          </div>
          {navigate("/")};
        </>
      )}
    </>
  );
};

export default NotExist;
