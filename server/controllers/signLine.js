import { STATUS_CODE } from "../utils/systemSettings.js";
import fs from "fs";
import path from "path";
const __dirname = path.resolve();
import mongoose from "mongoose";
const {
  NO_CONTENT,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  INTERNAL_SERVER_ERROR,
} = STATUS_CODE;
import Doc from "../model/TransportDocument.js";

export const getAllDocument = async (req, res) => {
  try {
    const documents = await Doc.find().populate([
      "transporter",
      "line",
    ]);
    if (!documents) {
      return res.status(NO_CONTENT).json({ message: "Document not found" });
    }
    res.status(OK).json(documents);
  } catch (err) {
    console.error(err.message);
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
export const getDocumentByLine = async (req, res) => {
  const { lineId, startDate, endDate } = req.params;

  let match;
  

  try {
    if (!!lineId && lineId !=="undefined") {
      match = {
        $and: [
          { dateSign: { $gte: new Date(startDate), $lte: new Date(endDate) } },
          { line: new mongoose.Types.ObjectId(lineId) },
        ],
      };
    } else {
      match = {
        dateSign: { $gte: new Date(startDate), $lte: new Date(endDate) },
      };
    }  
    const documents = await Doc.find(match)
      .populate("transporter", "-_id plate")
      .populate("line", "-_id lineNumber")
      .select("-__v");
    if (!documents) {
      return res.status(NO_CONTENT).json({ message: "Document not found" });
    }
    res.status(OK).json(documents);
  } catch (err) {
    console.error(err.message);
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const deleteDocument = await Doc.findByIdAndDelete(
      req.params.id
    );
    if (!deleteDocument) {
      return res.status(NOT_FOUND).json({ message: "Document not found" });
    }
    res.status(OK).json({ message: "Document deleted" });
    deleteDocument.documentImg.forEach((file) => {
      fs.unlink(path.join(__dirname, `public/${file}`), (error) => {
        console.log(error);
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
export const createDocument = async (req, res) => {
  try {
    const documentImg = req.files?.map((file) => file.filename);
    let { dateSign, transporter, line, quantity, missQuantity } = req.body;

    //Simple validation
    if (!documentImg || !dateSign || !transporter || !line) {
      return res.status(BAD_REQUEST).json({
        message: "Please enter all fields",
      });
    }
    let newDocument = new Doc({
      dateSign,
      transporter,
      line,
      quantity,
      missQuantity,
      documentImg: documentImg,
    });
    await newDocument.save();
    res.status(CREATED).json(newDocument);
  } catch (error) {
    console.error(error.message);
    res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
