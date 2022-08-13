import { pool } from "../../db/db.js";

export const getBloodRequestDetails = (req, res) => {
  pool.query(
    "select u.Name,br.* from user as u inner join blood_request as br using(Id) WHERE br.RequestStatus='Pending'",
    (err, result) => {
      if (err) {
        return res.send({ errorMsg: err.message });
      } else {
        return res.send(result);
      }
    }
  );
};

export const getBloodRequestHistory = (req, res) => {
  pool.query(
    "select u.Name,br.* from user as u inner join blood_request as br using(Id) WHERE br.RequestStatus='accepted' or br.RequestStatus='rejected'",
    (err, result) => {
      if (err) {
        return res.send({ errorMsg: err.message });
      } else {
        console.log(result);
        return res.send(result);
      }
    }
  );
};


const getBloodStockByBloodGroup = (bloodGroup) => {
  return new Promise((resolve, reject) => {
    pool.query(`select ${bloodGroup} from blood_stock`, (err, result) => {
      if (result) {
        return resolve(result);
      } else {
        return reject(err.message);
      }
    });
  });
};

const deductBloodStock = (bloodGroup, bloodAmount) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `update blood_stock set ${bloodGroup} = ${bloodGroup} - ${bloodAmount}`,
      (err, result) => {
        if(err) {
            return reject(err.message);
        } else {
            return resolve(true);
        }
      }
    );
  });
};

const updateRequestStatus = (requestId, status) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `update blood_request set RequestStatus = ? WHERE RequestId = ?`,
        [status,requestId],
        (err, result) => {
          if(err) {
              return reject(err.message);
          } else {
              return resolve(true);
          }
        }
      );
    });
  };



export const acceptBloodRequest = async (req, res) => {
  try {
    // first getting what amount of blood request is in stock
  const { requestId, bloodGroup, bloodUnit } = req.body;

  let bloodQuanityOfReqBloodObj = await getBloodStockByBloodGroup(bloodGroup);
  let bloodQuantityOfReqBlood = bloodQuanityOfReqBloodObj[0][`${bloodGroup}`];

  // if requested qty is less than available stock then sending unsucess message
  if (bloodQuantityOfReqBlood < bloodUnit) {
    return res.json({
      condition: "unsucess",
      msg: `Request Rejected Available Blood Quanity of ${bloodGroup}: ${bloodQuantityOfReqBlood} Requested Blood Quanity of ${bloodGroup}: ${bloodUnit} Deficit Blood Quantity of ${bloodGroup}: ${
        bloodUnit - bloodQuantityOfReqBlood
      } `,
    });
  } else {
    // if available requested amount is present
    // then first deducting the blood bank
    await deductBloodStock(bloodGroup,bloodUnit);

    // after deducting the blood request then changing the request status
    await updateRequestStatus(requestId,"accepted");

    return res.json({
        condition: "success",
        msg: `Request Is Accepted`,
      });
  }
  } catch (error) {
    return res.json({
        condition: "eroor",
        msg: error,
      });
  }

};

export const rejectBloodRequest = async (req,res) => {
  try {
    await updateRequestStatus(req.body.requestId,"rejected");
    return res.json({
      status: "success",
      msg: "Blood Request Rejected"
    });
  } catch (error) {
    return res.json({
      condition: "eroor",
      msg: error,
    });
  }
}
export const getBloodStockData = (req, res) => {
  pool.query("select * from blood_stock", (err, result) => {
    if (err) {
      return res.send(err);
    } else {
      let newResult = [];
      for (const [key, value] of Object.entries(result[0])) {
        let obj = {
          bloodGroup: key,
          unit: value,
        }
        newResult.push(obj);
      }
      return res.send(newResult);
      
    }
  });
};

// getBloodStockData();

// controller for blood request from patient
export const bloodRequestController = (req, res) => {
  let bloodGroup = req.body.bloodGroup;
  let bloodUnit = req.body.bloodUnit;
  let bloodDescription = req.body.bloodDescription;
  const patientId = req.body.patientId;

  console.log(bloodGroup, bloodUnit, bloodDescription, patientId);

  console.log("request body is: ", req.body);
  console.log("requested id is", req.body.patientId);

  pool.query(
    "INSERT INTO blood_request(Id,RequestedBlood,RequestedAmount,RequestDescription) VALUES(?,?,?,?)",
    [patientId, bloodGroup, bloodUnit, bloodDescription],
    (err, result) => {
      if (err) {
        return res.send({ errorMsg: err.message });
      } else {
        return res.send({ successMsg: "Successfully Reuested Blood" });
      }
    }
  );
};

// blood request for donor
export const bloodRequestDonor = (req, res) => {
  let bloodGroup = req.body.bloodGroup;
  let bloodUnit = req.body.bloodUnit;
  let bloodDescription = req.body.bloodDescription;
  const donorId = req.body.donorId;

  console.log(bloodGroup, bloodUnit, bloodDescription, donorId);

  console.log("request body is: ", req.body);
  console.log("requested id is", req.body.patientId);

  pool.query(
    "INSERT INTO blood_request(Id,RequestedBlood,RequestedAmount,RequestDescription) VALUES(?,?,?,?)",
    [donorId, bloodGroup, bloodUnit, bloodDescription],
    (err, result) => {
      if (err) {
        return res.send({ errorMsg: err.message });
      } else {
        return res.send({ successMsg: "Successfully Reuested Blood" });
      }
    }
  );
};

// get blood request history for donor
export const getDonorBloodRequestHistory = (req, res) => {
  console.log("patient blood request hisotry cookie: ",req.cookies.userId);
  pool.query(
    "select u.Name,br.* from user as u inner join blood_request as br using(Id) WHERE br.id=?",
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

// get patient donor blood request history
export const getPatientBloodRequestHistory = (req, res) => {
  pool.query(
    "select u.Name,br.* from user as u inner join blood_request as br using(Id) WHERE br.id=?",
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
