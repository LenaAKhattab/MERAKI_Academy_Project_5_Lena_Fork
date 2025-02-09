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
    const [udatedValue,setUpdated] =useState({})
    const state = useSelector((state)=>state)
    const token =  state.authReducer.token
    const [isUpdateWidth,setIsUpdateWidth] = useState(false)
    const [isUpdateHeight,setIsUpdateHeight] = useState(false)
    const [isUpdateDes,setIsUpdateDes] = useState(false)
    const [isUpdateLength,setIsUpdateLength] = useState(false)
    const [isUpdateWeight,setIsUpdateWeight] = useState(false)
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
                <p>height:{!isUpdateHeight?ele.height:<input></input>} </p>
                <p>length:{!isUpdateLength?ele.length:<input></input>} </p>
                <p>width:{!isUpdateWidth?ele.width:<input></input>}</p>
                    </div>:<p>weight:{!isUpdateWeight?ele.weight:<input></input>}</p>}
                <div>
                <p>Description: {!isUpdateDes?ele.description:<input></input>}</p>
                <p>predicted_price: {ele.predicted_price}</p>
                </div>
                <div>
                    <button onClick={()=>{
                        /* setIsUpdate(true) */
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