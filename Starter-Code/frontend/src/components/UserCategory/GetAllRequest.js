import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

//getAllRequest
//cancel
//update
const GetAllRequest = () => {
    const categoryNameInKg = ["paper","plastic","wood","clothes","Iron","Copper","Glasses","paper","food"];
    const categoryNameInHight =["furniture"]
    const [requests,setRequests]=useState([])
    const state = useSelector((state)=>state)
    const token =  state.authReducer.token
   const updateRequest=()=>{

    }
    const deleteRequest = (id)=>{
        console.log(id);
        
        axios.delete(`http://localhost:5000/user/cancelRequestById/${id}`)
        .then((response)=>{
            console.log(response);
            const newRequests = requests.filter((ele,i)=>{
                return ele.id !== id

            })
            setRequests(newRequests)
        })
        .catch((error)=>{
            console.log(error);
            

        })

    }
    useEffect(()=>{
        axios.get("http://localhost:5000/user/getRequestByuserId", {headers: {
        Authorization: `Bearer ${token}`
        }})
        .then((result)=>{
            console.log(result.data.result);
            setRequests(result.data.result)
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])


return (
    <div>{
        requests.map((ele,i)=>{
            console.log(ele);
            return <div>
                <p>request:</p>
                {ele.category_id == 23 ?<div>
                <p>height:{ele.height} </p>
                <p>length:{ele.length} </p>
                <p>width:{ele.width}</p>
                    </div>:<p>weight:{ele.weight}</p>}
                <div>
                <p>Description: {ele.description}</p>
                <p>predicted_price: {ele.predicted_price}</p>
                </div>
                <div>
                    <button onClick={()=>{
                        updateRequest()
                    }} >Update</button>
                    <button onClick={()=>{
                        deleteRequest(ele.id)
                    }}>Delete</button>
                </div>
                

            </div>
            

        })
        
        
        }
        </div>
)
}

export default GetAllRequest