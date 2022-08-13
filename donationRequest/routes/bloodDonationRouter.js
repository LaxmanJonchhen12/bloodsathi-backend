import { 
    donationRequestController,
    getDonationRequestDetails,
    acceptDonationRequest,
    rejectDonationRequest,
    getDonationHistory
 } from "../controller/bloodDonationController.js";
import express from "express";
const donationRequestRouter = express.Router();
donationRequestRouter.post("/donationrequest",donationRequestController);
donationRequestRouter.get("/donationRequestData",getDonationRequestDetails);
donationRequestRouter.post("/acceptDonationRequest",acceptDonationRequest);
donationRequestRouter.post("/rejectDonationRequest",rejectDonationRequest);
donationRequestRouter.get("/donationHistory/:id",getDonationHistory);
export default donationRequestRouter;
