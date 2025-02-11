import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCurrentCategory } from '../../redux/reducers/userCategory'
//put current category info into store 
import CurrentCategory from './CurrentCategory'
import "./user.css"



const UserCategory=()=>{
    const Navigate = useNavigate()
    const dispatch = useDispatch();
    const [allCategories,setAllCategories] = useState([])
    const currentCategory = useSelector(selector =>selector)
    console.log(currentCategory);
    

useEffect(()=>{
    axios.get("http://localhost:5000/category/getAllCategories")
    .then((result)=>{
        console.log(result.data.Categories);
        setAllCategories(result.data.Categories)
        

    })
    .catch((error)=>{
        console.log(error);
        

    })

},[])
    




return (

    <div className='categoryPage'>
        <div className='pre-category'>
            <div className='header-category'>
            <h2>Waste classification</h2>
            <p>we are welcome to pick up any type of these waste:</p>
            </div>
        </div>
        <div className='categorySection'>
        {allCategories.map((ele,i)=>{
            return <div className='catElement' onClick={()=>{
                console.log(ele);
                
                dispatch(setCurrentCategory(ele))
                Navigate("/currentCategory")
                console.log(currentCategory);
                
                
                

            }}>
                <img className='categoryImg' src= {ele.image}/> 
                <p>{ele.category_name}</p>
                <p>{ele.description}</p>
            </div>
            

        })}
        </div>
    </div>
)
}

export default UserCategory