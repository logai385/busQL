import { STATUS_CODE } from "../utils/systemSettings.js";
const {
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
} = STATUS_CODE;
import Unit from "../model/TransporterUnit.js";
import Line from "../model/Line.js";
export const getAllUnit = async (req, res) => {
  try {
    const units = await Unit.find();
    return res.status(OK).json(units);
  } catch (error) {
    console.error(error.message);
    return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
export const createUnit = async (req, res) => {
  const { name } = req.body;
  // Simple validation
  if (!name) {
    return res.status(BAD_REQUEST).json({ message: "name must not be empty" });
  }
  const existUnit = await Unit.findOne({ name });
  if (existUnit) {
    return res.status(CONFLICT).json({ message: "name already exists" });
  }
  // Create new unit
  const newUnit = new Unit({ name: name });
  try {
    await newUnit.save();
    return res.status(CREATED).json(newUnit);
  } catch (error) {
    console.error(error.message);
    return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
export const getAllUnitLine = async (req, res) => {
  try {
    const listUnit = await Unit.find();
    const listLine = await Line.find();  
    const unitLine = listUnit.map((unit) => {
      let lines = listLine.filter((line) => {
        return line.unit?.toString() === unit._id.toString();
      });
      return { unit, lines };
    });
    res.status(OK).json(unitLine);
  } catch (error) {
    console.error(error.message);
    return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
export const assignLine = async (req, res) => {
  const { unitId, lineId } = req.body;
  // Simple validation
  if (!unitId || !lineId) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "unitId or lineId must not be empty" });
  }
  try {
    const unit = await Unit.findById(unitId);
    if (!unit) {
      return res.status(NOT_FOUND).json({ message: "unit not found" });
    }
    const line = await Line.findById(lineId);
    if (!line) {
      return res.status(NOT_FOUND).json({ message: "line not found" });
    }
    line.unit = unitId;

    await line.save();
    return res.status(OK).json(line);
  } catch (error) {
    console.error(error.message);
    return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
