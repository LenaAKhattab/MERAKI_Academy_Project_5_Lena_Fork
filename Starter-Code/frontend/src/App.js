import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
// import { RouterProvider } from "react-router-dom";
// import { router } from "./Routers";
import AdminDash from "./components/AdminDash";

//===============================================================
import AdminCategory from "./components/AdminCategory";
import UserCategory from "./components/UserCategory/UserCategory";
import UserHomePage from './components/userHomePage'
import Navbar from './components/NavBar/index'


import OrderCreate from "./components/createOrder";
import CollectorsDash from "./components/CollectorsDash";
import  CurrentCategory  from "./components/UserCategory/CurrentCategory";
import GetAllRequest from "./components/UserCategory/GetAllRequest";
import SideNav from "./components/SideNav";

import GetOrder from "./components/GetAllOrder/GetOrder";
import Copper from "./components/CategorySections/Copper"


const App = () => {
  return (
  
 

    
  <>
  <Navbar/>
  <Routes>
      <Route path={"/register"} element={<Register />} />
      <Route path={"/"} element={<Login />} />
      <Route path={"/admin"} element={<AdminDash />} />
      <Route path={"/cart" } element={<OrderCreate/>}/>
      <Route path={"/category"} element={<AdminCategory />} />
      <Route path="/categoriesPage" element={<UserCategory/>} />

      <Route path={"/collector"}  element={<CollectorsDash/>}/> 
      <Route path="/currentCategory" element={<CurrentCategory/>}/>
      <Route path="/AllRequest" element= {<GetAllRequest/>}/>
      <Route path="/getAllOrderById" element={<GetOrder/>} />
      <Route path="/copper" element={<Copper/>} />

 
    

      <Route path={"/sideNav"} element={<SideNav  />}/>
      <Route path={"/Homepage"} element={<UserHomePage/>}/>

    </Routes >
  </>


    
    
  );
};

export default App;
