const ChargingStation = require("../model/chargingStation.schema");
const User = require("../model/user.schema");

exports.createChargingStation = async (req, res) => {
  try {
    const { name, latitude, longitude, status, powerOutput, connectorType } =
      req.body;
    console.log(req.body);
    const currentUser = req.currentUser;
    const user = await User.findById(currentUser.id);
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not exists can not create charging station",
      });
    }
    if (
      !name ||
      !latitude ||
      !longitude ||
      !status ||
      !powerOutput ||
      !connectorType
    ) {
      return res.status(404).json({
        success: false,
        message: "Enter required Filled",
      });
    }

    const chargingStation = await ChargingStation.findOne({
      name,
      "location.latitude": latitude,
      "location.longitude": longitude,
    });

    if (chargingStation) {
      return res.status(400).json({
        success: false,
        message: "Charging station already exists at requested location",
      });
    }

    const cs = await ChargingStation.create({
      name,
      location: {
        latitude,
        longitude,
      },
      status,
      powerOutput,
      connectorType,
      createdBy: currentUser.id,
    });
    return res.status(200).json({
      success: true,
      message: "Charging station created",
      data: cs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Invalid Server Error",
      error: `Error : ${error.message}`,
    });
  }
};

exports.updateChargingStation = async (req, res) => {
  try {
    const { name, latitude, longitude, status, powerOutput, connectorType } =
      req.body;
    const stationId = req.params.stationId;
    const chargingStation = await ChargingStation.findById(stationId);
    if (!chargingStation) {
      return res.status(404).json({
        status: false,
        message: "Charging station not found",
      });
    }

    const currentUser = req.currentUser;
    if (!chargingStation.createdBy.equals(currentUser.id)) {
      return res.status(403).json({
        status: false,
        message: "User not allowed to change details of charging station",
      });
    }

    if (req.body.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No details provided to update charging station",
      });
    }

    const updatedStation = await ChargingStation.findByIdAndUpdate(
      stationId,
      {
        $set: {
          name,
          location: { latitude, longitude },
          status,
          powerOutput,
          connectorType,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Charging station updated",
      data: updatedStation,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid Server Error",
      error: error.message,
    });
  }
};

exports.getChargingStations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const startIndex = (page - 1) * limit;

    const chargingStation = await ChargingStation.find()
      .limit(limit)
      .skip(startIndex)
      .exec();
    console.log(page);
    console.log(chargingStation);
    if (chargingStation.length < 0) {
      return res.status(404).json({
        success: false,
        message: "No charging station available",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All charging stations",
      data: chargingStation,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Invalid Server Error",
      error: error.message,
    });
  }
};

exports.deleteChargingStation = async (req, res) => {
  try {
    const stationId = req.params.stationId;
    console.log("id : ", stationId);
    const chargingStation = await ChargingStation.findById(stationId);

    const currentUser = req.currentUser;
    console.warn(currentUser);
    if (!chargingStation.createdBy.equals(currentUser.id)) {
      return res.status(404).json({
        status: false,
        message: "User not allowed to delete the charging station details",
      });
    }

    await ChargingStation.findByIdAndDelete(stationId);
    return res.status(200).json({
      success: true,
      message: "charging station deleted ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Invalid Server Error",
      error: error,
    });
  }
};

exports.getFilteredChargers = async (req, res) => {
  try {
    const { status, powerOutput, connectorType } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (powerOutput) filter.powerOutput = powerOutput;
    if (connectorType) filter.connectorType = connectorType;

    const chargingStations = await ChargingStation.find(filter);
    console.log(chargingStations);
    // console.log(`charging stations : ${chargingStations}`);
    return res.status(200).json({
      success: true,
      message: "filter charging station",
      data: chargingStations,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Invalid Server Error",
    });
  }
};
