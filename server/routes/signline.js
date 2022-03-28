import express from "express";
import multer from "multer";
import { getAllDocument, deleteDocument, createDocument } from "../controllers/signLine.js";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

//@route GET api/sign/documents
//@desc Get all documents
//@access Public
router.get("/", getAllDocument);

// @route DELETE api/sign/documents/:id
// @desc Delete a document
// @access Public
router.delete("/:id", deleteDocument);

//@route POST api/sign/documents
//@desc Create a new document
//@access Public
router.post("/", upload.single("documentImg"), createDocument);

export default router;
