const express = require("express");
const hotelRoutes = require("./routes/hotels");
const guestRoutes = require("./routes/guests");
const bookingRoutes = require("./routes/bookings");
const billRoutes = require("./routes/bills");
const roomRoutes = require("./routes/rooms");

const app = express();

app.use(express.json());

app.use((req,res,next)=> {
    console.log(req.path, req.method);
    next();
})

app.use("/api/hotels",hotelRoutes);
app.use("/api/guests",guestRoutes);
app.use("/api/bookings",bookingRoutes);
app.use("/api/bills",billRoutes);
app.use("/api/rooms",roomRoutes);



app.listen(4000, () => {
    console.log("listening on port 4000");
})