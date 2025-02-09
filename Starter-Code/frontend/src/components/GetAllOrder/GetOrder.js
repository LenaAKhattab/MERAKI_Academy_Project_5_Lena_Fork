import axios from "axios";
import React, { useState,useEffect } from 'react'

import React from 'react'

const GetOrder = () => {
  const [orders,setOrders]=useState({})

  useEffect(()=>{
    axios.get("http://localhost:5000/user/getOrderById/",{
      headers: {
        Authorization: `Bearer ${token}`
        }
    })
    .then((result)=>{
      console.log(result);
      

    })
    .catch((error)=>{
      console.log(error);
      

    })

  },[])
  return (
    <div>GetOrder</div>
  )
}

export default GetOrder