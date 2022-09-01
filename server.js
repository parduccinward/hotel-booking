const express = require("express");

const app = express();

app.use((req,res,next)=> {
    console.log(req.path, req.method);
    next();
})


app.listen(3000, () => {
    console.log("listening on port 3000");
})