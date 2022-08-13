import { pool } from "../../db/db.js";

export const getHomePageData = (req, res) => {
    console.log(req.session);
  const query =
    "select count(id) from user where UserType = 'Donor' union all select count(id) from blood_request union all select count(id) from blood_request where RequestStatus = 'accepted' union all select sum(apositive + anegative + bpositive + bnegative + opositive + onegative + abpositive + abnegative) as TotalBloodUnit from blood_stock";

    pool.query(query,(err,result)=> {
        if(err) {
            return res.status(400).json({
                msg: err.message,
            });
        } else {
            return res.json(
                [      
                {title: "Total Donors",value: result[0]['count(id)'],},
                {title: "Total Blood Requests",value: result[1]['count(id)'],},
                {title: "Total Approved  Blood Requests",value: result[2]['count(id)'],},
                {title: "Total Blood Unit",value: result[3]['count(id)'],}        
                ]
            );
        }
    })
};

export const getClientSideRequestDataForDonor = (req,res) => {
    const query = `select count(id) from blood_request where Id = ? union all select count(id) from blood_request where Id = ? and RequestStatus = 'Pending' union all select count(id) from blood_request where Id = ? and RequestStatus = 'accepted'  union all select count(id) from blood_request where Id = ? and RequestStatus = 'rejected'
    union all select count(id) from donation_request where Id = ? union all select count(id) from donation_request where Id = ? and DonationStatus='Pending' union all select count(id) from donation_request where Id = ? and DonationStatus='Approved' union all select count(id) from donation_request where Id = ? and DonationStatus='Rejected'
    `;
    
    pool.query(query,
        [
            req.cookies.userId,
            req.cookies.userId,
            req.cookies.userId,
            req.cookies.userId,
            req.cookies.userId,
            req.cookies.userId,
            req.cookies.userId,
            req.cookies.userId
        ],
        (err,result)=> {
        if(err) {
            return res.status(400).json({
                msg: err.message,
            });
        } else {
            return res.json(
                [
                    {title: "Total Blood Requests",value:result[0]['count(id)'],},
                    {title: "Total Blood Request Pending",value:result[1]['count(id)'],},
                    {title: "Total Blood Request Approved", value:result[2]['count(id)'],},
                    {title: "Total Blood Request Rejected", value:result[3]['count(id)'],},
                    {title: "Total Donation Requests", value:result[4]['count(id)'],},
                    {title: "Total Donation Request Pending", value:result[5]['count(id)'],},
                    {title: "Total Donation Request Approved", value:result[6]['count(id)'],},
                    {title: "Total Donation Request Rejected", value:result[7]['count(id)'],}
                ]
            );
        }
    })
}

export const getClientSideRequestDataForPatient = (req,res) => {
    console.log("user id cookie: ",req.cookies);
    const query = `select count(id) from blood_request where Id = ? union all select count(id) from blood_request where Id = ? and RequestStatus = 'Pending' union all select count(id) from blood_request where Id = ? and RequestStatus = 'accepted'  union all select count(id) from blood_request where Id = ? and RequestStatus = 'rejected'
    `;
    
    pool.query(query,
        [
            req.cookies.userId,
            req.cookies.userId,
            req.cookies.userId,
            req.cookies.userId
        ],
        (err,result)=> {
        if(err) {
            return res.status(400).json({
                msg: err.message,
            });
        } else {
            return res.json(
                [
                    {title: "Total Blood Requests", value:result[0]['count(id)'],},
                    {title: "Total Blood Request Pending", value:result[1]['count(id)'],},
                    {title: "Total Blood Request Approved", value:result[2]['count(id)'],},
                    {title: "Total Blood Request Rejected", value:result[3]['count(id)'],}
                ]
            );
        }
    })
}
