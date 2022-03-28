import { STATUS_CODE } from "../utils/systemSettings";
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  INTERNAL_SERVER_ERROR,
} = STATUS_CODE;
const transporter = require("../model/Transporter");

export const getTransporterByLine = async (req, res) => {
  try {
    // get all transporterss
    const { lineId } = req.params;
    const condition = {
      $or: [{ mainLines: lineId }, { minorLines: lineId }],
    };
    const transporters = await transporter
      .find(condition)
      .select("-mainLines -minorLines");

    res.status(OK).json(transporters);
  } catch (err) {
    console.log(err.message);
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
export const getAllTransporter = async (req, res) => {
  try {
    // get all transporters
    const transporters = await transporter
      .find()
      .populate(["mainLines", "minorLines"]);
    res.status(OK).json({ transporters });
  } catch (err) {
    console.error(err.message);
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
export const createTranporter = async (req, res) => {
  try {
    const { plate, mainLines, minorLines } = req.body;
    // Simple validation
    if (!plate) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "plate must not be empty" });
    }
    const existTransporter = await transporter.findOne({ plate });
    if (existTransporter) {
      return res.status(CONFLICT).json({ message: "plate already exists" });
    }
    // Create new transporter
    const newTransporter = new transporter({
      plate: plate,
      mainLines: mainLines,
      minorLines: minorLines,
    });
    await newTransporter.save();
    res.status(CREATED).json(newTransporter);
  } catch (error) {
    console.error(err.message);
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
export const deleteTransporter = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTransporter = await transporter.findByIdAndDelete(id);
    if (!deleteTransporter) {
      return res.status(NOT_FOUND).json({ message: "transporter not found" });
    }
    return res
      .status(OK)
      .json({ success: true, message: "transporter deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
export const updateTransporter = async (req, res) => {
  try {
    const { id, plate, mainLines, minorLines } = req.body;
    //simple validation
    if (!plate) {
      return res.status(NOT_FOUND).json({ message: "plate must not be empty" });
    }
    const existTransporter = await transporter.findOne({ plate });
    if (existTransporter && existTransporter.id !== id) {
      return res.status(CONFLICT).json({ message: "plate already exists" });
    }
    let updateTransporter = {
      plate: plate,
      mainLines: mainLines,
      minorLines: minorLines,
    };
    updateTransporter = await transporter.findOneAndUpdate(
      { _id: id },
      updateTransporter,
      { new: true }
    );
    return res.status(OK).json(updateTransporter);
  } catch (error) {
    console.error(error.message);
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });

  }
};
