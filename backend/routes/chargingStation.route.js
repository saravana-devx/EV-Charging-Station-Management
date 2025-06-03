const express = require("express");
const {
  createChargingStation,
  updateChargingStation,
  deleteChargingStation,
  getFilteredChargers,
  getChargingStations,
} = require("../controllers/chargingStation.controller");

const auth = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/create-charging-station", auth, createChargingStation);
router.patch(
  "/update-charging-station/:stationId",
  auth,
  updateChargingStation
);
router.get("/filter-charing-station", getFilteredChargers);
router.delete(
  "/delete-charging-station/:stationId",
  auth,
  deleteChargingStation
);

module.exports = router;
