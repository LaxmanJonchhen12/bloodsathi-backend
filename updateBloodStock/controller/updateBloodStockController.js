import { increaseBloodStock } from "../../donationRequest/controller/bloodDonationController.js";

export const updateBloodStock = async (req,res) => {
    try {
        let {bloodGroup,unit} = req.body;
        await increaseBloodStock(bloodGroup,unit);
        return res.json({
            status: "success",
            mesage: "Blood Stock Updated",
          });
    } catch (error) {
        return res.status(400).json({
            status: "failure",
            mesage: `sql error: ${error}`,
          });
    }
}