import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routers";
//===============================================================

const App = () => {
  return <RouterProvider router={router} />;

  {
    /* <Routes>
        <Route path={"/register"} element={<Register />} />
        <Route path={"/login"} element={<Login />} />
      </Routes> */
  }
};

export default App;
