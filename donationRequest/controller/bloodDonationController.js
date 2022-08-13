import { pool } from "../../db/db.js";

// controller for getting donation request data
export const getDonationRequestDetails = (req, res) => {
  pool.query(
    "select u.Name,br.* from user as u inner join donation_request as br using(Id);",
    (err, result) => {
      if (err) {
        return res.send({ errorMsg: err.message });
      } else {
        return res.send(result);
      }
    }
  );
};

export const getDonationHistory = (req, res) => {
  pool.query(
    "select u.Name,br.* from user as u inner join donation_request as br using(Id) WHERE br.id=?",
    [req.cookies.userId],
    (err, result) => {
      if (err) {
        return res.send({ errorMsg: err.message });
      } else {
        return res.send(result);
      }
    }
  );
}

export const increaseBloodStock = (bloodGroup, bloodAmount) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `update blood_stock set ${bloodGroup} = ${bloodGroup} + ${bloodAmount}`,
      (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(true);
        }
      }
    );
  });
};

const updateRequestStatus = (DonationId, status) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `update donation_request set DonationStatus = ? WHERE DonationId = ?`,
      [status, DonationId],
      (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(true);
        }
      }
    );
  });
};

export const acceptDonationRequest = async (req, res) => {
  try {
      let { DonationId, DonatedBlood, DonatedUnit } = req.body;

    // first increase the quantity of blood stock in the blood bank
    await increaseBloodStock(DonatedBlood,DonatedUnit);

    // then changing the donation request satus from pendint 
    // to approved
    await updateRequestStatus(DonationId,'Approved');

    return res.json({
      status: "success",
      mesage: "Donation Request Accepted",
    });
  } catch (error) {
    return res.json({
      status: "failure",
      mesage: `sql error: ${error}`,
    });
  }
};

export const rejectDonationRequest = async (req, res) => {
  try {
      let { DonationId } = req.body;

    // then changing the donation request satus from pendint 
    // to rejected
    await updateRequestStatus(DonationId,'Rejected');

    return res.json({
      status: "failure",
      mesage: "Donation Request Rejected",
    });
  } catch (error) {
    return res.json({
      status: "failure",
      mesage: `sql error: ${error}`,
    });
  }
};

// controller for inserting form data of donation request to db
export const donationRequestController = (req, res) => {
  console.log("req body is: ", req.body);
  let bloodGroup = req.body.bloodGroup;
  let bloodUnit = req.body.bloodUnit;
  let bloodDescription = req.body.bloodDescription;
  const donorId = req.body.donorId;

  console.log(bloodGroup, bloodUnit, bloodDescription, donorId);
  console.log("request body is: ", req.body);
  console.log("requested id is", req.body.donorId);

  pool.query(
    "INSERT INTO donation_request(Id,DonatedBlood,DonatedUnit,description) VALUES(?,?,?,?)",
    [donorId, bloodGroup, bloodUnit, bloodDescription],
    (err, result) => {
      if (err) {
        return res.send({ errorMsg: err.message });
      } else {
        return res.send({ successMsg: "Successfully Donated Blood" });
      }
    }
  );
};
