import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";

import {
  setOrders,
  setOrderStatus,
} from "../../redux/reducers/collectorOrders";
const CollectorDash = () => {
  const authToken = useSelector((reducers) => reducers.authReducer.token);
  const orders = useSelector(
    (reducers) => reducers.collectorOrdersReducer.orders
  );

  const dispatch = useDispatch();

  const getAssignedOrdersById = () => {
    axios
      .get(`http://localhost:5000/user/getAssignById/`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch(setOrders(result.data.orders));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAssignedOrdersById();
  }, []);
  return (
    <div>
      {orders?.map((order, index) => (
        <div>
          <p>{order.status}</p>
          <p>{order.last_price}</p>
          <p>{order.location}</p>
        </div>
      ))}
    </div>
  );
};

export default CollectorDash;
