import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
// import { RouterProvider } from "react-router-dom";
// import { router } from "./Routers";
import AdminDash from "./components/AdminDash";
import CollectorDash from "./components/collectorDash";
// import CollectorDash from "./components/CollectorDash";

//===============================================================



const App = () => {
  return (
    <Routes>
      <Route path={"/register"} element={<Register />} />
      <Route path={"/"} element={<Login />} />
      <Route path={"/admin"} element={<AdminDash />} />
      <Route path={"/collector"} element={<CollectorDash />} />
      {/* <Route path={"/collector"} element={<CollectorDash />} /> */}
    </Routes>
  );
};

export default App;
