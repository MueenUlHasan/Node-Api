import model from "../model/model"
import { CreateUserInput,CreateLoginInput} from "../interface/user.interface";
import {  Response } from "express"

export async function signUp(user:CreateUserInput,res:Response){
    try{
   const NewUser=new model(user);
   await NewUser.save()
   res.json({message:"New user Created"})
    
    }
    catch{
        res.json({message:"User Already Exist"})
   
    }
}


export async function signIn(user:CreateLoginInput,res:Response){
    try{
        const User=await model.findOne({email:user.email})
        if(User!==null){
            const passwordResult= await User.comparePassword(user.password)
            if(passwordResult==true){
                const token=await User.generateAuthToken()
                res.json({
                    message:"LogIn Successful",
                    token:token
                })
            }
            else{
                res.json({
                    message:"Please Check Your Password"
                })
            }
        }
        else{
            res.json({
                message:"Please Recheck Your Email"
            })
        }
    }catch{
        res.status(500).json({
            message:"Something Went Wrong"
        })
    }
    
}