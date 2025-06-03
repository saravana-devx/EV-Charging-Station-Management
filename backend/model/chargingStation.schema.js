const mongoose = require("mongoose");

const chargingStationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
      default: "Out of Service",
      enum: ["Operational", "Out of Service", "Under Maintenance"],
    },
    powerOutput: {
      type: String,
      required: true,
      enum: [
        "3.7 kW (AC Level 1)",
        "7.4 kW (AC Level 2)",
        "11 kW (AC 3-phase)",
        "22 kW (AC 3-phase)",
        "50 kW (DC Fast)",
        "150 kW (DC Fast)",
        "350 kW (Ultra-fast)",
      ],
    },
    connectorType: {
      type: String,
      required: true,
      enum: [
        "Type 1 (SAE J1772)",
        "Type 2 (Mennekes)",
        "CHAdeMO",
        "CCS (Combined Charging System)",
        "Tesla Supercharger",
        "GB/T",
      ],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ChargingStation = mongoose.model(
  "ChargingStation",
  chargingStationSchema
);

module.exports = ChargingStation;
