const express = require("express");
const cors = require("cors");

const app = express();

const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");

const database = require("./config/database.js");

const chargingStationRoute = require("./routes/chargingStation.route.js");
const authRoute = require("./routes/auth.route.js");

app.use(bodyParser.json());

const allowedOrigins =
  process.env.Node_ENV === "production"
    ? [process.env.Production_url]
    : ["http://localhost:5173"];

app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true, // Sends rate-limit headers
  legacyHeaders: false, // Disables old X-RateLimit headers
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: "Rate limit exceeded",
      message:
        "You have reached the maximum allowed requests. Try again later.",
    });
  },
});

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(limiter);

// app.use("/api/v1/auth",authRoute);
app.use("/api/v1/chargingStation", chargingStationRoute);
app.use("/api/v1/auth", authRoute);

const PORT = (process.env.PORT = 4000);

app.get("/", (req, res) => {
  res.send(`<h1>Server is running</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port no. ${PORT}`);
});
