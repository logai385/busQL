import fs from "fs";
import mongoose from "mongoose";
import csv from "fast-csv";
import "dotenv/config";
import Transporter from "../model/Transporter.js";
import Line from "../model/line.js";
import Unit from "../model/TransporterUnit.js"

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lxuok.mongodb.net/QLBUS?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
      }
    );
    console.log("DB conneted");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();
const convertPlate = (line) => {
  let strLine = line.trim();
  if (strLine.length == 2) return "0" + strLine;
  if (strLine.length == 1) return "00" + strLine;
  return strLine;
};

async function insertRec(row) {
  try {
    
    const lines = await Line.find();
    const unit = await Unit.findOne({name:row.unit});

    let mainLines_Str = row.mainLines.trim();
    const mainLines = [];
    if (mainLines_Str || mainLines_Str.length > 1) {
      mainLines_Str = mainLines_Str.split("-");

      mainLines_Str.map((lineNumber) => {
        const line = lines.find((line) => {
          return line.lineNumber === convertPlate(lineNumber);
        });

        if (line) mainLines.push(line._id.toString());
      });
    }
    let minorLines_Str = row.minorLines.trim();
    const minorLines = [];
    if (minorLines_Str || minorLines_Str.length > 1) {
      minorLines_Str = minorLines_Str.split("-");

      minorLines_Str.map((lineNumber) => {
        const line = lines.find((line) => {
          return line.lineNumber === convertPlate(lineNumber);
        });

        if (line) minorLines.push(line._id.toString());
      });
    }
    
    let updatedTransporter = new Transporter({
      plate: row.plate,
      mainLines: mainLines,
      minorLines: minorLines,
      unit:unit?._id
    });
    await updatedTransporter.save();
  } catch (error) {
    console.log(error);
  }
}

async function startRead() {
  const stream = fs
    .createReadStream("./utils/DSBus_3.csv")
    .pipe(csv.parse({ headers: true }))
    .on("data", async (row) => {
      try {
        stream.pause();
        await insertRec(row);
      } finally {
        stream.resume();
      }
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
      process.exit(1);

    });
}
startRead();
