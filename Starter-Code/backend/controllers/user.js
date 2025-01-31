const bcrypt =require("bcrypt");
const {pool} =require("../models/db");
const jwt =require("jsonwebtoken");
const salt = 10;




const register = async (req,res)=>{
    const {first_name,last_name,email,password,role_id,phone_number} = req.body
    const passwordHashed = await bcrypt.hash(password,salt)
    const query =`INSERT INTO users (first_name,last_name,email,password,role_id,points,phone_number) VALUES($1 , $2 , $3 , $4,$5,$6,$7)`;
    const data = [first_name,last_name,email,passwordHashed,role_id,0,phone_number];
    pool.query(query,data)
    .then((result)=>{
        res.status(201).json({
            success:true,
            message:"Account created successfully",
            result:result
        })
    })
    .catch((error)=>{
        res.status(409).json({
            success: false,
            message:  "The email already exists",
            err:error
    })
    })

}


const login = (req,res)=>{
    const {email,password} = req.body;
    
    pool.query(`SELECT * FROM users WHERE email = '${email}'`)
    .then(async(result)=>{
        const isValid =  await bcrypt.compare(password,result.rows[0].password)
        if(isValid){
            res.status(201).json({
                success:true,
                message:"you are log in successfully"
            })
        }
        res.status(403).json({
            success:false,
            message:"password or email is incorrect "
        })

    })
    .catch((error)=>{
        res.status(403).json({
            success:false,
            message:"password or email is incorrect ",
            err:error
        })

    })


}



module.exports = {login,register}

