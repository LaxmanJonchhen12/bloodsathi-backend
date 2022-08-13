import { 
    bloodRequestController, 
    getBloodRequestDetails, 
    acceptBloodRequest,
    rejectBloodRequest,
    getBloodStockData,
    getBloodRequestHistory,
    bloodRequestDonor,
    getDonorBloodRequestHistory,
    getPatientBloodRequestHistory
} from "../controller/bloodRequestController.js";
import express from "express";
const bloodRequestRouter = express.Router();
bloodRequestRouter.post("/bloodrequest",bloodRequestController);
bloodRequestRouter.get("/bloodRequestData",getBloodRequestDetails);
bloodRequestRouter.post("/acceptBloodRequest", acceptBloodRequest);
bloodRequestRouter.post("/rejectBloodRequest", rejectBloodRequest );
bloodRequestRouter.get("/getBloodStockData",getBloodStockData);
bloodRequestRouter.get("/getBloodRequestHistory",getBloodRequestHistory);
bloodRequestRouter.post("/bloodrequestdonor",bloodRequestDonor);
bloodRequestRouter.get("/donorBloodHistory/:id",getDonorBloodRequestHistory);
bloodRequestRouter.get("/patientBloodHistory/:id",getPatientBloodRequestHistory);



export default bloodRequestRouter;