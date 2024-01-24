const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use("/bookings", require("./routes/bookingsRoutes"));
app.use("/user", require("./routes/userRoutes"));

module.exports = app;