import { Route, Routes, useNavigate } from "react-router-dom";
import LogoTransition from "./components/LogoTransition";
import Home from "./components/Home";
import { useEffect } from "react";
import authApi from "./assets/api/authApi";

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<LogoTransition />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
