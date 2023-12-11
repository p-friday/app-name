import React, { useState, FormEvent } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useCookies } from 'react-cookie';
import AuthProvider from '../Auth/AuthProvider';

interface UserData {
  username: string;
  email: string;
  password: string;
  showPassword: boolean;
}

const Register: React.FC = () => {
  
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const auth = AuthProvider();

  const handleClickShowPassword = () => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      showPassword: !prevUserData.showPassword,
    }));
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    username: '',
    email: '',
    password: '',
    showPassword: false,
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newUser = { userData };
    try {
      await axios.post('http://tripplaner.somee.com/api/Authorization/Register', newUser.userData, { headers: auth });
      setUserData({
        username: '',
        email: '',
        password: '',
        showPassword: false,
      });
      navigate(`/login`);
      console.log("Add user")
    } catch (error : any) {
      if (error.response.status == 400) {
        console.log(error.response.data.errors.Password[0]);
        setErrorMessage(error.response.data.errors.Password[0])
      }
      else if (error.response) {
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message)
      }
      else {
        console.log(`ERROR: ${error.message}`);
      }
    }
  };

  return (
    <>
      <div className='registerBody'>
        <div className='registerForm'>
          <form onSubmit={handleSubmit}>
            <b>REGISTER FORM</b>
            <TextField
              id='username'
              label='Username'
              type='text'
              variant='outlined'
              required
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
            />
            <TextField
              id='email'
              label='E-mail'
              type='email'
              variant='outlined'
              required
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            <FormControl variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>
              <OutlinedInput
                id='password'
                label='Password'
                type={userData.showPassword ? 'text' : 'password'}
                required
                autoComplete='none'
                value={userData.password}
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {userData.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {errorMessage && (
              <p className="error"> {errorMessage} </p>
            )}
            <div className='registerButton'>
              <Button variant='contained' color='primary' type='submit'>
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className='backButton'>
        <Button variant='contained' style={{ width: '15%' }} onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
    </>
  );
};

export default Register;
