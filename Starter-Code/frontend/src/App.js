import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
// import { RouterProvider } from "react-router-dom";
// import { router } from "./Routers";
import AdminDash from "./components/AdminDash";
import AdminCategory from "./components/AdminCategory";
import UserCategory from "./components/UserCategory/UserCategory";
import UserHomePage from "./components/userHomePage";
import Navbar from "./components/NavBar/index";

import UserHomePage from "./components/userHomePage";

import Glasses from "./components/CategorySections/Glasses";

import Navbar from "./components/NavBar";

import OrderCreate from "./components/createOrder";
import CollectorsDash from "./components/CollectorsDash";
import CurrentCategory from "./components/UserCategory/CurrentCategory";
import GetAllRequest from "./components/UserCategory/GetAllRequest";
import SideNav from "./components/SideNav";

import GetOrder from "./components/GetAllOrder/GetOrder";
import Copper from "./components/CategorySections/Copper";
import Paper from "./components/CategorySections/Paper";
import Food from "./components/CategorySections/Food";
import Iron from "./components/CategorySections/Iron";
import Furniture from "./components/CategorySections/Furniture";
import Wood from "./components/CategorySections/Wood";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/register"} element={<Register />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/admin"} element={<AdminDash />} />
        <Route path={"/cart"} element={<OrderCreate />} />
        <Route path={"/category"} element={<AdminCategory />} />
        <Route path="/categoriesPage" element={<UserCategory />} />

        <Route path={"/collector"} element={<CollectorsDash />} />
        <Route path="/currentCategory" element={<CurrentCategory />} />
        <Route path="/AllRequest" element={<GetAllRequest />} />
        <Route path="/getAllOrderById" element={<GetOrder />} />

        <Route path={"/sideNav"} element={<SideNav />} />
        <Route path={"/"} element={<UserHomePage />} />
        <Route path={"/Homepage"} element={<UserHomePage />} />
        <Route path={"/category/Copper"} element={<Copper />} />
        <Route path={"/category/Paper"} element={<Paper />} />
        <Route path={"/category/Food"} element={<Food />} />
        <Route path={"/category/Glass"} element={<Glasses />} />
        <Route path={"/category/Iron"} element={<Iron />} />
        <Route path={"/category/Furniture"} element={<Furniture />} />
        <Route path={"/category/Wood"} element={<Wood />} />
      </Routes>
    </>
  );
};

export default App;
