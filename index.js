
import loginRouter from "./login/routes/loginUserRoute.js";
import registerRouter from "./register/routes/registerUserRoute.js";
import bloodRequestRouter from "./bloodRequest/routes/bloodRequestRoutes.js";
import donationRequestRouter from "./donationRequest/routes/bloodDonationRouter.js";
import updateBloodStockRoutes from "./updateBloodStock/routes/updateBloodStockRoutes.js";
import adminPanelDataRoutes from "./adminPanelData/routes/adminPanelDataRoutes.js";
import express from "express";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentials: true
    }
));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "100mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(session({
    key: "user",
    secret: 'login',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 86400,
    },
})
);


// routes
app.use(registerRouter);
app.use(loginRouter);
app.use(bloodRequestRouter);
app.use(donationRequestRouter);
app.use(updateBloodStockRoutes);
app.use(adminPanelDataRoutes);

// listening server
app.listen(3001, ()=>{
    console.log("running server");
})