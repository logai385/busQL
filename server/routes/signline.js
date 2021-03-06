import express from "express";
import multer from "multer";
import { getAllDocument, deleteDocument, createDocument,getDocumentByLine } from "../controllers/signLine.js";
import path from 'path';
import verifyToken from "../middleware/auth.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/");
  },
  filename: function (req, file, cb) {
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
const upload = multer({ storage: storage });

//@route GET api/sign/documents
//@desc Get all documents
//@access Public
router.get("/", getAllDocument);
//@route GET api/sign/documents
//@desc Get all documents
//@access Public
router.get("/getDocumentByLine/line=:lineId?/startDate=:startDate/endDate=:endDate", getDocumentByLine);

// @route DELETE api/sign/documents/:id
// @desc Delete a document
// @access Public
router.delete("/:id",verifyToken, deleteDocument);

//@route POST api/sign/documents
//@desc Create a new document
//@access Public
router.post("/",verifyToken, upload.array("documentImg"), createDocument);

export default router;
