import axios from "axios";
import React, { useState,useEffect } from 'react'
import { useSelector ,useDispatch} from "react-redux";
import { setOrder,deleteOrder} from "../../redux/reducers/request"


const GetOrder = () => {
  const [orders,setOrders]=useState([])
  const [message,setMessage] = useState("")
  const state = useSelector(state =>state)
  console.log(state, "state");
  const Dispatch = useDispatch()
  const order_ = state.userRequest.orders
  const token = state.authReducer.token
  console.log(token,order_);
  const cancelOrder = (id,i)=>{
    axios.put(`http://localhost:5000/user/cancelOrderById/${id}`)
    .then((result)=>{
      console.log( "rrr",result.status);
      if(result.status == 200){
        Dispatch(deleteOrder(i))
      }
      setMessage(result.data.message)
      /* if(message == "") */
     
    })
    .catch((error)=>{
      console.log( error);
    })
  }

  useEffect(()=>{
    console.log(state);
    axios.get("http://localhost:5000/user/getOrderById",{
      headers: {
        Authorization: `Bearer ${token}`
        }
    })
    .then((result)=>{
      console.log(result.data.result);
      setOrders(result.data.result)
      Dispatch(setOrder(result.data.result))
    })
    .catch((error)=>{
      console.log(error);
    })

  },[])
console.log(orders);

  return (
    <div>
      
      {order_?.map((ele,i)=>{
        console.log(ele);
        return <div key={i}> 
          <p>last_price:{ele.last_price}</p>
          <p>Location:{ele.location}</p>
          <p>predicted_price:{ele.predicted_price}</p>
          <p>Status:{ele.status}</p>
      {/*    <p>{ele.arrive_time}</p> ==>back*/}
      <button onClick={()=>{
        cancelOrder(ele.id,i)
       
      }}>Cancel Order</button>
      <p>{message}</p>

        </div>

        

      })} 
    </div>
  )
}

export default GetOrder