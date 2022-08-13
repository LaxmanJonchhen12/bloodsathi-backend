import { adminLogin, patientLogin, donorLogin, loginDonor, loginPatient } from "../controller/loginController.js";
import express from "express";
const loginRouter = express.Router();
loginRouter.post("/login",adminLogin);
loginRouter.post("/loginPatient",patientLogin);
loginRouter.get("/loginPatient", loginPatient);
loginRouter.post("/loginDonor",donorLogin);
loginRouter.get("/loginDonor",loginDonor);
    

export default loginRouter;

