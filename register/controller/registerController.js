import{ pool} from "../../db/db.js";

    // contorller for regsitering patient
export const registerPatient = (req,res) => {

    const Name = req.body.Name;
    const Phone = req.body.Phone;
    const Email = req.body.Email;
    const DOB = req.body.DOB;
    const Gender = req.body.Gender;
    const BloodGroup = req.body.BloodGroup;
    const Address = req.body.Address;
    const UserName = req.body.UserName;
    const Password = req.body.Password;
    console.log(UserName, Password);

    pool.query(
        "INSERT INTO user(Name,Phone,Email,DOB,Gender,BloodGroup,Address,Password,UserType,UserName) VALUES(?,?,?,?,?,?,?,?,?,?)",
 [Name,Phone,Email,DOB,Gender,BloodGroup,Address,Password,'Patient',UserName],
        (err, result) => {
            if(err) {
                return res.send({errorMsg: err.message});
            } else {
                return res.send({successMsg: "Successfully Registerd the User"});
            }
        }
    )
}

// controller for regsitering Donor
export const registerDonor = (req,res) => {

    const Name = req.body.Name;
    const Phone = req.body.Phone;
    const Email = req.body.Email;
    const DOB = req.body.DOB;
    const Gender = req.body.Gender;
    const BloodGroup = req.body.BloodGroup;
    const Address = req.body.Address;
    const UserName = req.body.UserName;
    const Password = req.body.Password;
    console.log(UserName, Password);

    pool.query(
        "INSERT INTO user(Name,Phone,Email,DOB,Gender,BloodGroup,Address,Password,UserType,UserName) VALUES(?,?,?,?,?,?,?,?,?,?)",
 [Name,Phone,Email,DOB,Gender,BloodGroup,Address,Password,'Donor',UserName],
        (err, result) => {
            if(err) {
                return res.send({errorMsg: err.message});
            } else {
                return res.send({successMsg: "Successfully Registerd the User"});
            }
        }
    )
}