const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config();

const connection = require("./connection/connection");
require("./routes/googleAuth/passport");

// routes
const signup = require("./routes/signup/signup");
const contact = require("./routes/contact/contact");
const category = require("./routes/category/category");
const product = require("./routes/products/product");
const cart = require("./routes/cart/cart");
const getoffer = require("./routes/offer/offer");
const banner = require("./routes/banner/banner");
const offer = require("./routes/offer/offer");
const admin = require("./routes/Admin/login/login");
const feedback = require("./routes/feedback/feedback");
const googleAuth = require("./routes/googleAuth/googleAuth");
const orders = require("./routes/orders/orders");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options("*", cors());

app.use(express.json());
app.use(bodyParser.json());

app.use("/", signup);
app.use("/", contact);
app.use("/", category);
app.use("/", product);
app.use("/", cart);
app.use("/", getoffer);
app.use("/", banner);
app.use("/", offer);
app.use("/", admin);
app.use("/", feedback);
app.use("/auth", googleAuth);
app.use("/", orders);

app.get("/", (req, res) => {
  res.send("🚀 ZEPX Backend Working!");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
