import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbaar from "./elements/Navbaar";
import Home from "./elements/Home";
import Register from "./elements/Register";
import Edit from "./elements/Edit";
import Details from "./elements/Details";
import Error from "./utils/Error";
import {BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbaar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/view/:id" element={<Details />} />
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </>
  );
}

export default App;

