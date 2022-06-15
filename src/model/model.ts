import mongoose from "mongoose";
import { v4 as uuid } from 'uuid'
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema=new mongoose.Schema({
    email:{type:String,unique:true,required:true},
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    password:{type:String,required:true}
})
userSchema.methods.comparePassword = async function (GivenPassword:any) {
    var result = await bcrypt.compare(GivenPassword, this.password)
    if (result) {
      return true
    } else {
      return false
    }
  } 
  userSchema.methods.generateAuthToken = function () {
    const user = this
    const token = jwt.sign({ id: user._id }, 'qwertyuiop')
    return token
  }
userSchema.pre("save",
async function(next){
   try{ const salt=await bcrypt.genSalt();
    const hashedpassword=await bcrypt.hash(this.password,salt)
    this.password=hashedpassword;
    next()
}catch{console.log("Wait Please")}})
export default mongoose.model("Users",userSchema)
