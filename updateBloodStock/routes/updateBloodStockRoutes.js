
import express from "express";
import { updateBloodStock } from "../controller/updateBloodStockController.js";
const updateBloodStockRouter = express.Router();
updateBloodStockRouter.post("/updateBloodStock",updateBloodStock);
export default updateBloodStockRouter;