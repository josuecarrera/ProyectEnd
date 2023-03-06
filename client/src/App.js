import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Detail from "./components/Detail/Detail.jsx";
import Create from "./components/Create/Create.jsx";
import Page404 from "./components/Page404/Page404.jsx";
import axios from "axios";
axios.defaults.baseURL = "https://proyectend-production.up.railway.app/";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path={"/"} element={<LandingPage />} />
        <Route exact path={"/home"} element={<Home />} />
        <Route exact path={"/detail/:id"} element={<Detail />} />
        <Route exact path={"/create"} element={<Create />} />
        <Route path={"*"} element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
