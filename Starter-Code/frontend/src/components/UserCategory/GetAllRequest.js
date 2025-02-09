import React, { useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
//getAllRequest
//cancel
//update
const GetAllRequest = () => {
    const state = useSelector((state)=>state)
    const token =  state.authReducer.token
    
    
    useEffect(()=>{
        axios.get("http://localhost:5000/user/getRequestByuserId", {headers: {
        Authorization: `Bearer ${token}`
        }})
        .then((result)=>{
            console.log(result);
            

        })
        .catch((error)=>{
            console.log(error);
            

        })
    },[])


return (
    <div>GetAllRequest</div>
)
}

export default GetAllRequest