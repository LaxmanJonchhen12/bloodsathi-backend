import express from "express";
import { getHomePageData,getClientSideRequestDataForDonor,getClientSideRequestDataForPatient } from "../controller/adminPanelDataController.js";
const adminPanelDataRoutes = express.Router();

adminPanelDataRoutes.get("/homepagedata",getHomePageData);
adminPanelDataRoutes.get("/clientSideDataForDonor/:id",getClientSideRequestDataForDonor);
adminPanelDataRoutes.get("/clientSideDataForPatient/:id",getClientSideRequestDataForPatient);

export default adminPanelDataRoutes;

