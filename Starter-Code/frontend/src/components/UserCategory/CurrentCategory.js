

import { MDBCard, MDBRow, MDBCol, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBInputGroup  } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux'


import React,{useContext,useEffect,useState} from 'react'
import axios from 'axios'
const CurrentCategory = () => {
    const state = useSelector(state=>state)
    console.log(state.authReducer.token);
    const categoryName = state.userCategory.currentCategory.category_name
    const category_ = state.userCategory.currentCategory
    const [request,setRequest] = useState({})
    const categoryNameInKg = ["paper","plastic","wood","clothes","Iron","Copper","Glasses","paper","food"]
    const categoryNameInPoint = ["paper","food"]
    const categoryNameInHight =["furniture"]
    const token = state.authReducer.token
    //detailes about each category
    //create request 
    //
    console.log(category_);
    
    
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
    <div className='Page'>
         <MDBCard style={{ maxWidth: '80%'}} className='req1'>
      <MDBRow className='g-0'>
        <MDBCol md='4'>
          <MDBCardImage className='img2' src={category_.picture_details} alt='...'  />
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <MDBCardTitle><h3>{category_.category_name}</h3></MDBCardTitle>
            <MDBCardText className='p2'>
            {category_.detail}
            </MDBCardText>
            <MDBCardText>
            <small className='text-muted'>Last updated 3 mins ago</small>
            </MDBCardText>
        </MDBCardBody>
        </MDBCol>
    </MDBRow>
    </MDBCard>
    {/*   <div className='section1'>
        <p className='p1'>{category_.detail}</p>
        <img  className='img1' src={category_.picture_details}/>
        
        </div>
        <h3 className='price1 '>Price:{category_.price_per_kg
        }JOD</h3> */}
        <div className='Page1 req1'  style={{ maxWidth: '50%' ,maxHeight:'50%'}} >
            <p>order worker to pick up your trash:</p>
        {categoryNameInKg.includes(categoryName)&& 
        <MDBInputGroup className='mb-3' textBefore='weight' style={{fontWeight: "800",fontSize:"15px"}}>
        <input className='form-control' type='number' placeholder= "weight" onChange={(e)=>{
        setRequest({...request,weight:e.target.value})
        }}/>
    </MDBInputGroup>
    }
    {categoryNameInHight.includes(categoryName)&& <div>
        <MDBInputGroup className='mb-3' textBefore='length'>
        <input className='form-control' type='text'  maxLength ="3" minlength="1" placeholder= "length" id='length' onChange={(e)=>{
        setRequest({...request,length:e.target.value})
        }}  />
    </MDBInputGroup>

    <MDBInputGroup className='mb-3'  textBefore='width'>
        <input className='form-control' type='text' id='width' maxLength ="3" minlength="1" placeholder= "width" onChange={(e)=>{
        setRequest({...request,width:e.target.value})
        }} />
    </MDBInputGroup>
    <MDBInputGroup className='mb-3'  textBefore='height:'>
        <input className='form-control' type='text' id='width' maxLength ="3" minlength="1" placeholder= "height:" onChange={(e)=>{
        setRequest({...request,height:e.target.value})
        }} />
    </MDBInputGroup>
    </div>}
    <MDBInputGroup className='mb-3' textBefore='Description:'>
    <textarea   className='l1' onChange={(e)=>{
        setRequest({...request,description:e.target.value})
        }}></textarea>
    </MDBInputGroup>
    <button className='btn btn-success btn-primary' onClick={(event)=>{
            event.preventDefault()
        setRequest({...request,order_id:8})
        setRequest({...request,category_id_id:8})
        createRequest()}
    }>Create Request</button>
    </div>
        
    {/*  {categoryNameInKg.includes(categoryName)&&
        <div className='l1'><label for="weight">weight: <input id='
        weight' placeholder= "weight" onChange={(e)=>{
        setRequest({...request,weight:e.target.value})
        }}/> Kg
        </label></div>}
        {categoryNameInHight.includes(categoryName)&&
        <div className='l1'>
        <label   for="length">length:<input maxLength ="3" minlength="1" placeholder= "length" id='length' onChange={(e)=>{
        setRequest({...request,length:e.target.value})
        }} />
        M
            </label><br/>
        <label   for="width">width: <input id='width' maxLength ="3" minlength="1" placeholder= "width" onChange={(e)=>{
        setRequest({...request,width:e.target.value})
        }}/> M
        </label><br/>
        <label  className='l1' for="width">height: <input id='width' maxLength ="3" minlength="1" placeholder= "width" onChange={(e)=>{
        setRequest({...request,height:e.target.value})
        }}/> M
        </label><br/>
        </div>} */}
       {/*  <br/><label  className='l1'>Description :</label><br/>
        <textarea   className='l1' onChange={(e)=>{
        setRequest({...request,description:e.target.value})
        }}></textarea><br/> */}
       
 

    </div>
)
}

export default CurrentCategory