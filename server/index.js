import express  from "express";
import 'dotenv/config' 
import path from 'path';
import cors from "cors";
import mongoose from "mongoose";

//Import Routes
import authRouter from "./routes/auth.js";
import lineRoute from "./routes/line.js";
import transporterRoute from "./routes/transporter.js";
import signlineRoute from "./routes/signline.js";
import unitRoute from "./routes/unit.js";
// connect to db
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lxuok.mongodb.net/QLBUS?retryWrites=true&w=majority`,{
        useNewUrlParser: true,
      }
    );
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();
const __dirname = path.resolve();

const app = express();
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/lines", lineRoute);
app.use("/api/transporters", transporterRoute);
app.use("/api/documents", signlineRoute);
app.use("/api/units", unitRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
