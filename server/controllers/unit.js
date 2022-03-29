import { STATUS_CODE } from "../utils/systemSettings.js";
const {OK, NOT_FOUND, BAD_REQUEST, CONFLICT, CREATED, INTERNAL_SERVER_ERROR, UNAUTHORIZED} = STATUS_CODE;
import Unit from "../model/TransporterUnit.js";
export const getAllUnit = async (req, res) => {
    try {
        const units = await Unit.find();
        return res.status(OK).json(units);
    }
    catch (error) {
        console.error(error.message);
        return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}
export const createUnit = async (req, res) => {
    const {name} = req.body;
    // Simple validation
    if (!name) {
        return res.status(BAD_REQUEST).json({ message: "name must not be empty" });
    }
    const existUnit = await Unit.findOne({ name });
    if (existUnit) {
        return res.status(CONFLICT).json({ message: "name already exists" });
    }
    // Create new unit
    const newUnit = new Unit({name:name})
    try {
        await newUnit.save();
        return res.status(CREATED).json(newUnit);
    }
    catch (error) {
        console.error(error.message);
        return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
}
