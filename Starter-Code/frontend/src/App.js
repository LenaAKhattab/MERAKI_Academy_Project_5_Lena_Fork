import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";

//===============================================================

const App = () => {
  return (
    <div>
  
      <Routes>
        <Route path={"/register"} element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
