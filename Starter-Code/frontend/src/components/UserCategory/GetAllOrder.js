import React, { useEffect } from 'react'
import axios from 'axios'
const GetAllOrder = () => {
    useEffect(()=>{
        axios.get("http://localhost:5000/user/getOrderById",{})

    },[])



  return (
    <div>GetAllOrder</div>
  )
}

export default GetAllOrder