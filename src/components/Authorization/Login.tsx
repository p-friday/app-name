import { TextField } from '@mui/material';
import React, { FC, useState } from 'react';
import { useNavigate, Route, Routes } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useCookies } from 'react-cookie';
import RoutesController from '../Routes/RoutesController';

interface LoginData {
    login: string;
    password: string;
    showPassword: boolean;
}

const Login: FC = () => {

    const [loginData, setLoginData] = useState<LoginData>({
        login: '',
        password: '',
        showPassword: false
    });

    const [, setCookie, ] = useCookies(['user'])

    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setLoginData({
            ...loginData,
            showPassword: !loginData.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newLogin = { ...loginData };
        try {
            const response = await axios.post('http://tripplaner.somee.com/api/Authorization/Login', newLogin,)
            setLoginData({
                login: '',
                password: '',
                showPassword: false
            });
            setCookie('user', response.data, { path: '/' });
            navigate(`/home`);
        } catch (error: any) {
            if (error.response) {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message)
            }
            else {
                console.log(`ERROR: ${error.message}`);
                setErrorMessage(error.message)
            }
        }
    }

    return (
        <>
            <div className='registerBody'>
                <div className='registerForm'>
                    <form onSubmit={handleLogin}>
                        <b>LOGIN</b>
                        <TextField
                            id='login'
                            label="Login"
                            type='text'
                            variant='outlined'
                            required
                            value={loginData.login}
                            onChange={(e) => setLoginData({ ...loginData, login: e.target.value })}
                        />
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                label="Password"
                                type={loginData.showPassword ? 'text' : 'password'}
                                required
                                autoComplete='none'
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {loginData.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {errorMessage && (
                            <p className="error"> {errorMessage} </p>
                        )}
                        <div className='registerButton'>
                            <Button variant="contained" color="primary" type="submit">
                                Sign in
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='backButton'>
                <Button variant="contained" style={{ width: "15%" }} onClick={() => navigate(-1)}>Back</Button>
            </div>
            <Routes>
                <Route path="/home/*" element={<RoutesController />} />
            </Routes>
        </>
    )
}

export default Login;