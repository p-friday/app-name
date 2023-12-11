import "./App.css";
import { Route, Routes } from 'react-router-dom';
import Start from "./components/Home/Start";
import Login from "./components/Authorization/Login";
import Home from "./components/Home/Home";
import NotExist from "./components/NotExist/NotExist";
import Register from "./components/Authorization/Register";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
    <NavBar />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/register/*" element={<Register />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="*" element={<NotExist />} />
      </Routes>      
    </>
  );
}

export default App;
