import { Request, Response } from "express";
import { signUp, signIn } from "../servies/services";
import { CreateUserInput, CreateLoginInput } from "../interface/user.interface";

export async function addUser(req:Request<{}, {}, CreateUserInput>, res:Response) {
  try {
    const body = req.body;
    await signUp(body, res);
  } catch (error) {
    res.json({ message: 'Something Went Wrong' });
  }
}

export async function logIn(req:Request<{}, {}, CreateLoginInput>, res:Response) {
  try {
    const body = req.body;
    const result = await signIn(body, res);
  } catch {}
}
