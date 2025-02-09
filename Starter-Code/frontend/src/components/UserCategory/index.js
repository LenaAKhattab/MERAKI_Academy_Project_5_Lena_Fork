import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { setCurrentCategory } from '../../redux/reducers/userCategory'
//put current category info into store 




const UserCategory=()=>{
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

    <div>

        {allCategories.map((ele,i)=>{
            return <button onClick={()=>{
                console.log(ele);
                
                dispatch(setCurrentCategory(ele))
                console.log(currentCategory);
                
                

            }}>
                <img src= {ele.image}/>
                <p>{ele.name}</p>
                <p>{ele.description}</p>
            </button>
            

        })}
    </div>
)
}

export default UserCategory