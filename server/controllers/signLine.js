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
const TransportDocument = require("../model/TransportDocument");

export const getAllDocument = async (req, res) => {
  try {
    const documents = await TransportDocument.find().populate([
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

export const deleteDocument = async (req, res) => {
  try {
    const deleteDocument = await TransportDocument.findByIdAndDelete(
      req.params.id
    );
    if (!deleteDocument) {
      return res.status(NOT_FOUND).json({ message: "Document not found" });
    }
    return res.status(OK).json({ message: "Document deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
export const createDocument = async (req, res) => {
  try {
    let { dateSign, transporter, line, quantity } = req.body;

    let documentImg = req.file?.originalname;
    // console.log(req.file);
    //Simple validation

    if (!documentImg || !dateSign || !transporter || !line) {
      return res.status(BAD_REQUEST).json({
        message: "Please enter all fields",
      });
    }
    let newDocument = new TransportDocument({
      dateSign,
      transporter,
      line,
      quantity,
      documentImg: documentImg,
    });
    await newDocument.save();
    res.status(CREATED).json(newDocument);
  } catch (error) {
    console.error(error.message);
    res.status(INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
