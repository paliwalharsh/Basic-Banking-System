const express = require("express");

const mongoose = require("mongoose");

const compression = require("compression");

const morgan = require("morgan");

const path = require("path");
const app = express();

const fs = require("fs");

const bodyParser = require("body-parser");

const helmet = require("helmet");

const viewRouter = require("./routes/viewAll.js");
const transactRouter = require("./routes/transfer.js");

app.set("view engine","ejs");
app.set("views","views");

app.use(helmet({
    contentSecurityPolicy:{
        useDefaults:true,
        directives:{
            "script-src":["'self'","cdn.jsdelivr.net","kit.fontawesome.com"]
        }
    }
}));

app.use(compression());

app.use(morgan("combined",{
    stream:fs.createWriteStream(path.join(__dirname,"systemLogs","access.logs"))
}))

app.use(bodyParser.urlencoded());

app.use("/public",express.static(path.join(__dirname,"public")));

app.use(viewRouter);
app.use(transactRouter);

app.get("/",(req,res,next) => {
    res.render("homepage.ejs");
})
mongoose.connect(`mongodb+srv://${process.env.mongoUser}:${process.env.mongoPass}@cluster0.kpq9o.mongodb.net/${process.env.mongodbName}?retryWrites=true&w=majority`)
.then((result) => {
    if(result){
        app.listen(3000);
    }
    else{
        throw new Error("not able to connect mongodb");
    }
})