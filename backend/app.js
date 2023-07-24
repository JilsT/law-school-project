const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require("./Routes/Routes");


const app = express();

app.use(cors());

app.use(bodyParser.json());

mongoose.set("strictQuery", false);

app.use("/", routes);

mongoose.connect("mongodb+srv://Jils:Shreejana%401@cluster0.daqae5e.mongodb.net/LawSchool?retryWrites=true&w=majority").then(() => {
    app.listen(9000, () => {
        console.log("Server is now running on port 9000");
    });
}).catch(err => console.log(err));