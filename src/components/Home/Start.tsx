import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import { Route, Routes } from 'react-router-dom';
import Login from '../Authorization/Login';
import Register from '../Authorization/Register';

const Start = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className='LoginChoose'>
                <div className='StartHeader'>
                    <h3>Welcome to TripPlanner</h3>
                </div>
                <Fab variant="extended" style={{ width: "30%", backgroundColor: "#E63946", color: "#F1FAEE" }} onClick={() => navigate('login')}>
                    Sign in
                </Fab>
                <Fab variant="extended" style={{ width: "30%", backgroundColor: "#E63946", color: "#F1FAEE" }} onClick={() => navigate('register')}>
                    Sign up
                </Fab>
            </div>
            <Routes>
                <Route path="login/*" element={<Login />} />
                <Route path="register/*" element={<Register />} />      
            </Routes>
        </>
    )
}

export default Start;