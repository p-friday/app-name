import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const NotExist = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const navigate = useNavigate();

  return (
    <>
      {cookies.user &&
        <>
          <div className='NotExist'><b>Not Found 404</b></div>
        </>
      }
      {!cookies.user &&
        <>
          {navigate("/")};
        </>
      }
    </>
  )
}

export default NotExist