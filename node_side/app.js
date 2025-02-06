const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const post = require("./routes/post");
const view = require("./routes/view");
const category = require("./routes/category");
const admin = require("./routes/admin");
const subcategory = require("./routes/subcategory");
const enquiry = require("./routes/enquiry");
const auth = require("./routes/auth"); // Import auth routes

const app = express();
const port = process.env.PORT || 5000;

connectDB();

// CORS Configuration
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, // Allows cookies to be sent
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // Enable Cookie Parser

// Routes
app.use("/auth", auth); // Authentication routes
app.use("/view", view);
app.use("/product", post);
app.use("/category", category);
app.use("/admin", admin);
app.use("/subcategory", subcategory);
app.use("/enquiry", enquiry);

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is Successfully Running on port " + port);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});
