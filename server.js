const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

let corsOptions = {
    origin: "localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * In development, you may need to drop existing tables and re-sync database. 
 * Just use force: true as following code:
 * 
 * db.sequelize.sync({ force: true }).then(() => {
 *  console.log("Drop and re-sync db.");
 * });
 */
const db = require("./models");
db.sequelize.sync();

// Simple Route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to ExMySQL"
    });
});

// Post Routes
require("./routes/post.routes")(app);

// Set PORT,listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/`);
});