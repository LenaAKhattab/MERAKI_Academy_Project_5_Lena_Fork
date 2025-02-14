
import { useSelector } from 'react-redux'
import React,{useContext,useEffect,useState} from 'react'
import axios from 'axios'
const CurrentCategory = () => {
    const state = useSelector(state=>state)
    console.log(state.authReducer.token);
    const categoryName = state.userCategory.currentCategory.category_name
    const [request,setRequest] = useState({})
    const categoryNameInKg = ["Paper","Plastic","Wood","Clothes","Iron","Copper","Glass","Paper","Food"]
    const categoryNameInPoint = ["paper","food"]
    const categoryNameInHight =["Furniture"]
    const token = state.authReducer.token
    //detailes about each category
    //create request 
    //
    
    const createRequest = (event)=>{
        axios.post("http://localhost:5000/user/createRequestByuserId",{
            category_id :state.userCategory.currentCategory.id,
            weight:request.weight || 0,
            height:request.height || 0,
            length:request.length || 0,
            width:request.width || 0,
            description:request.description
        },
        {headers: {
        Authorization: `Bearer ${token}`
        }})
        .then((result)=>{
        console.log(result);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
return (
    <div>
        <form>
        {categoryNameInKg.includes(categoryName)&&
        <label for="weight">weight: <input id='
        weight' placeholder= "weight" onChange={(e)=>{
        setRequest({...request,weight:e.target.value})
        }}/> Kg
        </label>}
        {categoryNameInHight.includes(categoryName)&&
        <div>
        <label for="length">length:<input maxLength ="3" minlength="1" placeholder= "length" id='length' onChange={(e)=>{
        setRequest({...request,length:e.target.value})
        }} />
        M
            </label><br/>
        <label for="width">width: <input id='width' maxLength ="3" minlength="1" placeholder= "width" onChange={(e)=>{
        setRequest({...request,width:e.target.value})
        }}/> M
        </label><br/>
        <label for="width">height: <input id='width' maxLength ="3" minlength="1" placeholder= "width" onChange={(e)=>{
        setRequest({...request,height:e.target.value})
        }}/> M
        </label><br/>
        </div>}
        <br/><label>Description :</label><br/>
        <textarea onChange={(e)=>{
        setRequest({...request,description:e.target.value})
        }}></textarea><br/>
        <button onClick={(event)=>{
            event.preventDefault()
        setRequest({...request,order_id:8})
        setRequest({...request,category_id_id:8})
        createRequest()}
    }>Create Request</button>
    </form>

    </div>
)
}

export default CurrentCategory