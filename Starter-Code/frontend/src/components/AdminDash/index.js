import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import { setOrders } from "../../redux/reducers/adminOrders";
const AdminDash = () => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  // ================================================================
  const authToken = useSelector((reducers) => reducers.authReducer.token);
  const orders = useSelector((reducers) => reducers.adminOrdersReducer.orders);
  const getAllOrders = () => {
    axios
      .get("http://localhost:5000/admin/getAllOrders")
      .then((result) => {
        console.log(result);
        dispatch(setOrders(result.data.orders));
      })
      .catch((error) => {
        console.log(error);
        setMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div>
      {orders?.map((order, index) => (
        <div>
          {order.user_id}
          <br />
          {order.status}
          <br />
          {order.collector_id}
          collector_id
        </div>
      ))}
    </div>
  );
};

export default AdminDash;
