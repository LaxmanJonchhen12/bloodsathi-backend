import { registerPatient,registerDonor } from "../controller/registerController.js";
import express from "express";


const registerRouter = express.Router();

registerRouter.post("/registerPatient",registerPatient);
registerRouter.post("/registerDonor",registerDonor);
export default registerRouter;
