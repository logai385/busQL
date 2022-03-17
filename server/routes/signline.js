const express = require("express");
const router = express.Router();
const multer = require("multer");
const TransportDocument = require("../model/TransportDocument");
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

router.get("/documents", async (req, res) => {
  try {
    const documentList = await TransportDocument.find().populate(["transporter","line"]);
    res.json({
      success: true,
      count: documentList.length,
      documentList,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route DELETE api/sign/documents/:id
// @desc Delete a document
// @access Public
router.delete("/documents/:id", async (req, res) => {
  try {
    const deleteDocument = await TransportDocument.findByIdAndDelete(req.params.id);
    if (!deleteDocument) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }
    return res.json({ success: true, message: "Document deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
})
//@route POST api/sign/documents
//@desc Create a new document
//@access Public 
router.post("/documents",upload.single("documentImg") ,async (req, res) => {

  try {
    
    let { dateSign, transporter,line,quantity } = req.body;
 
    
    let documentImg = req.file?.originalname;
    //Simple validation
    console.log(dateSign, transporter,line,quantity,documentImg);
    if ( !documentImg || !dateSign || !transporter||!line) {
      return res.status(200).json({
        success: false,
        message: "Please enter all fields",
      });
    }
    let newDocument = new TransportDocument({
      dateSign,
      transporter,
      line,
      quantity,
      documentImg:documentImg,
    });
    await newDocument.save();
    res.json({ success: true, message: "Document created",document: newDocument });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
