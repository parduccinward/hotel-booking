const express = require("express");
const hotelRoutes = require("./routes/hotels");
const guestRoutes = require("./routes/guests");


const app = express();

app.use(express.json());

app.use((req,res,next)=> {
    console.log(req.path, req.method);
    next();
})

app.use("/api/hotels",hotelRoutes);
app.use("/api/guests",guestRoutes);


app.listen(4000, () => {
    console.log("listening on port 4000");
})