
import {pool} from "../../db/db.js";


// controller for admin login
export const adminLogin = (req, res) => {
    const UserName = req.body.UserName;
    const Password = req.body.Password;
    console.log(UserName, Password);
    pool.query(
        "SELECT * FROM admin WHERE username = ? and password = ?",
        [UserName, Password],
        (err, result) => {
            if(err) {
                return res.send({errorMsg: err.message});
            } 

            if(result.length > 0){
                req.session.user = result;
                console.log(req.session.user);
                res.send(result);
            } else {
                res.send({ message: "Wrong username or password" });
            }
        }
    )
}

// controller for patient login
export const patientLogin = (req, res) => {
    const UserName = req.body.UserName;
    const Password = req.body.Password;
    const Id = req.body.Id;
    console.log(UserName, Password, Id);
    console.log(req.sessionID);
    pool.query(
        "SELECT * FROM user WHERE username = ? and password = ? and UserType='Patient'",
        [UserName, Password],
        (err, result) => {
            if(err) {
                return res.send({errorMsg: err.message});
            } 

            if(result.length > 0){
                res.cookie('userId', result[0].Id, {
                    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                    httpOnly: true, // The cookie only accessible by the web server
                });
                req.session.user = result;
                console.log(req.session.user);
                console.log(req.session.user[0].Id);
                res.send(result);
            } else {
                res.send({ message: "Wrong username or password" });
            }
        }
    )
}

// controller for retriving patient session data
export const loginPatient = (req, res) => {
    if(req.session.user) {
        res.send(
            {
                LoginStatus : true,
                user: req.session.user
            }
        );
    }
    else {
        res.send({ LoginStatus: false});
    }
}


// controller for donor login
export const donorLogin = (req,res) => {
    const UserName = req.body.UserName;
    const Password = req.body.Password;
    const Id = req.body.Id;
    console.log(UserName, Password, Id);
    pool.query(
        "SELECT * FROM user WHERE username = ? and password = ? and UserType='Donor'",
        [UserName, Password],
        (err, result) => {
            if(err) {
                return res.send({errorMsg: err.message});
            } 

            if(result.length > 0){
                res.cookie('userId', result[0].Id, {
                    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
                    httpOnly: true, // The cookie only accessible by the web server
                });
                req.session.user = result;
                res.send(result);
            } else {
                res.send({ message: "Wrong username or password" });
            }
        }
    )
}

// controller for retriving donorsession data
export const loginDonor = (req, res) => {
    if(req.session.user) {
        res.send(
            {
                LoginStatus : true,
                user: req.session.user
            }
        );
    }
    else {
        res.send({ LoginStatus: false});
    }
}