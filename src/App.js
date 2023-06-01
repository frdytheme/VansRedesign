import { Route, Routes } from "react-router-dom";
import LogoTransition from "./components/LogoTransition";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LogoTransition />} />
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
