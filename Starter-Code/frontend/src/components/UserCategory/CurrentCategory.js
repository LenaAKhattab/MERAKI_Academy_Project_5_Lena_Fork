import { MDBCard, MDBRow, MDBCol, MDBCardImage, MDBCardBody, 
MDBCardTitle, MDBCardText,MDBInputGroup } from 'mdb-react-ui-kit';
import { useSelector } from 'react-redux'


import React,{useContext,useEffect,useState} from 'react'
import axios from 'axios'
const CurrentCategory = () => {
    const state = useSelector(state=>state)
    console.log(state.authReducer.token);
    const categoryName = state.userCategory.currentCategory.category_name
    const category_ = state.userCategory.currentCategory
    const [request,setRequest] = useState({})
    const categoryNameInKg = ["Paper","Plastic","Wood","Clothes","Iron","Copper","Glass","Paper","Food"]
    const categoryNameInPoint = ["paper","food"]
    const categoryNameInHight =["Furniture"]
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
         <MDBCard style={{ maxWidth: '80%' }} className='req1'>
      <MDBRow className='g-0'>
        <MDBCol md='4'>
          <MDBCardImage  src={category_.picture_details} alt='...' fluid />
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
        {categoryNameInKg.includes(categoryName)&& <MDBInputGroup className='mb-3' size='sm' textBefore='Small'>
        <input className='form-control' type='text' />
    </MDBInputGroup>
    }
        

    <MDBInputGroup className='mb-3' textBefore='Default'>
        <input className='form-control' type='text' />
    </MDBInputGroup>

    <MDBInputGroup className='mb-3' size='lg' textBefore='Large'>
        <input className='form-control' type='text' />
    </MDBInputGroup>


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
        </div>}
        <br/><label  className='l1'>Description :</label><br/>
        <textarea   className='l1' onChange={(e)=>{
        setRequest({...request,description:e.target.value})
        }}></textarea><br/>
        <button className='btn btn-success btn-primary' onClick={(event)=>{
            event.preventDefault()
        setRequest({...request,order_id:8})
        setRequest({...request,category_id_id:8})
        createRequest()}
    }>Create Request</button> */}
 

    </div>
)
}

export default CurrentCategory