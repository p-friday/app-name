import "./App.css";
import { Route, Routes } from "react-router-dom";
import Start from "./components/Home/Start";
import Login from "./components/Authorization/Login";
import Home from "./components/Home/Home";
import NotExist from "./components/NotExist/NotExist";
import Register from "./components/Authorization/Register";
import NavBar from "./components/NavBar/NavBar";
import Schedule from "./components/Schedule/Schedule";
import MySchedules from "./components/Schedule/MySchedules";
import Plans from "./components/Plans/plans";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/register/*" element={<Register />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/plans/*" element={<Plans />} />
        <Route path="/schedule/:id" element={<Schedule />} />
        <Route path="/myschedules/*" element={<MySchedules />} />
        <Route path="*" element={<NotExist />} />
      </Routes>
    </>
  );
}

export default App;
