import axios from "axios";
import React, { useState,useEffect } from 'react'
import { useSelector } from "react-redux";


const GetOrder = () => {
  const [orders,setOrders]=useState([])
  const [message,setMessage] = useState("")
  const state = useSelector(state =>state)
  const token = state.authReducer.token
  console.log(token);
  const cancelOrder = (id)=>{
    axios.put(`http://localhost:5000/user/cancelOrderById/${id}`)
    .then((result)=>{
      console.log( result);
      setMessage(result.data.message)
      
    })
    .catch((error)=>{
      console.log( error);

    })

  }
  

  useEffect(()=>{
    axios.get("http://localhost:5000/user/getOrderById",{
      headers: {
        Authorization: `Bearer ${token}`
        }
    })
    .then((result)=>{
      console.log(result.data.result);
      setOrders(result.data.result)
      

    })
    .catch((error)=>{
      console.log(error);
      

    })

  },[])

  return (
    <div>
      <div>getallorder</div>
      {orders?.map((ele,i)=>{
        console.log(ele);
        return <div>
          <p>last_price:{ele.last_price}</p>
          <p>Location:{ele.location}</p>
          <p>predicted_price:{ele.predicted_price}</p>
          <p>Status:{ele.status}</p>
      {/*    <p>{ele.arrive_time}</p> ==>back*/}
      <button onClick={()=>{
        cancelOrder(ele.id)
      }}>Cancel Order</button>
      <p>{message}</p>

        </div>

        

      })} 
    </div>
  )
}

export default GetOrder