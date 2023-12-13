import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
  <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </CookiesProvider>
)
