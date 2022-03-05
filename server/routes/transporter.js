const express = require("express");
const router = express.Router();
const transporter = require("../model/Transporter");
// @route GET api/qlnv/transporters
// @desc Get all transporters
// @access Public
router.get("/", async (req, res) => {
  try {
    // get all transporters
    const transporters = await transporter
      .find()
      .populate(["mainLines", "minorLines"]);
    res.json({ success: true, transporters });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: "server error" });
  }
});
// @route POST api/qlnv/transporters
// @desc Create a new transporter
// @access Public
router.post("/", async (req, res) => {
  try {
    const { plate, mainLines, minorLines } = req.body;
    // Simple validation
    if (!plate) {
      return res
        .status(400)
        .json({ success: false, message: "plate must not be empty" });
    }
    const existTransporter = await transporter.findOne({ plate });
    if (existTransporter) {
      return res
        .status(400)
        .json({ success: false, message: "plate already exists" });
    }
    // Create new transporter
    const newTransporter = new transporter({
      plate: plate,
      mainLines: mainLines,
      minorLines: minorLines,
    });
    await newTransporter.save();
    res.json({ success: true, message: "transporter created", newTransporter });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "server error" });
  }
});

//@route Delete api/qlnv/transporters/plate/:plate
//@desc Delete a transporter
//@access Public
router.delete("/:id", async (req, res) => {
  try {
    const {id} = req.params;   

    const deleteTransporter = await transporter.findByIdAndDelete(id);
    if (!deleteTransporter) {
      return res
        .status(404)
        .json({ success: false, message: "transporter not found" });
    }
    return res.json({ success: true, message: "transporter deleted" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: "server error" });
  }
});
//@route PUT api/qlnv/transporters
//@desc Update a transporter
//@access Public
router.put("/", async (req, res) => {
    try{
        const {id, plate, mainLines, minorLines } = req.body;
        //simple validation
        if(!plate){
            return res.status(400).json({success: false, message: "plate must not be empty"});
        }
        const existTransporter = await transporter.findOne({plate});
        if(existTransporter && existTransporter.id !== id){
            return res.status(400).json({success: false, message: "plate already exists"});
        }
        let updateTransporter={
            plate: plate,
            mainLines: mainLines,
            minorLines: minorLines,
        }
        updateTransporter = await transporter.findOneAndUpdate({_id: id}, updateTransporter, {new: true});
        return res.json({ success: true, message: "transporter updated", updateTransporter });
    }catch(error){
        console.error(error.message);
        return res.status(500).json({ success: false, message: "server error" });
    }
});

module.exports = router;
