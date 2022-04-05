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
import Bus from "../model/Transporter.js";
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
export const getAllUnitBus = async (req, res) => {
  try {
    const listUnit = await Unit.find();
    const listBus = await Bus.find();
    const unitBus = listUnit.map((unit) => {
      let buses = listBus.filter((bus) => {
        return bus.unit?.toString() === unit._id.toString();
      });
      return { unit, buses };
    });
    res.status(OK).json(unitBus);
  } catch (error) {
    console.error(error.message);
    return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
export const assignBus = async (req, res) => {
  const { unitId, busId } = req.body;
  // Simple validation
  if (!unitId || !busId) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "unitId or busId must not be empty" });
  }
  try {
    const unit = await Unit.findById(unitId);
    if (!unit) {
      return res.status(NOT_FOUND).json({ message: "unit not found" });
    }
    const bus = await Bus.findById(busId);
    if (!bus) {
      return res.status(NOT_FOUND).json({ message: "bus not found" });
    }
    bus.unit = unitId;

    await bus.save();
    return res.status(OK).json(bus);
  } catch (error) {
    console.error(error.message);
    return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
export const removeBus = async (req, res) => {
  const { unitId, busId } = req.body;
  // Simple validation
  if (!unitId || !busId) {
    return res
      .status(BAD_REQUEST)
      .json({ message: "unitId or busId must not be empty" });
  }
  try {
    const unit = await Unit.findById(unitId);
    if (!unit) 
      return res.status(NOT_FOUND).json({ message: "unit not found" });
    
    const bus = await Bus.findById(busId);
    if (!bus) 
      return res.status(NOT_FOUND).json({ message: "bus not found" });
    
    bus.unit = null;
    await bus.save();
    return res.status(OK).json(bus);
  } catch (error) {
    console.error(error.message);
    return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
export const deleteUnit = async (req, res) => {
  const { id } = req.params;
  try {
    const unit = Unit.findById(id);
    if (!unit) return res.status(NOT_FOUND).json({ message: "unit not found" });

    await unit.remove();

    return res.status(OK).json({ message: "unit deleted" });
  } catch (error) {
    console.error(error.message);
    return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
