import express from "express"
import { addUser,logIn} from "../controllers/user.contollers"
import { createLoginSchema, createUserSchema } from "../interface/user.interface"
import validateResource from "../middleware/validate.user"
const router=express.Router()

router.post('/signup',validateResource(createUserSchema),addUser)
router.post('/login',validateResource(createLoginSchema),logIn)
export default router