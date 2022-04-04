import fs from "fs";
import mongoose from "mongoose";
import csv from "fast-csv";
import "dotenv/config";
import transporter from "../model/Transporter.js";

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

async function insertRec(row) {
  console.log(row);
  try {
    const newTransporter = new transporter({
      plate: row.plate,
    });
    console.log(newTransporter);
    await newTransporter.save();
  } catch (error) {
    console.log(error);
  }
}

async function startRead() {
  const stream = fs
    .createReadStream("./utils/DSBus.csv")
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
    });
}
startRead();
