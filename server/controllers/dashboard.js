import Doc from "../model/TransportDocument.js";
import Line from "../model/Line.js";
import Bus from "../model/Transporter.js";
import Unit from "../model/TransporterUnit.js";
import mongoose from "mongoose";
export const getQualityByUnit = async (req, res) => {
  try {
    let rs = await Doc.aggregate([
      { $group: { _id: "$line", total: { $sum: "$quantity" } } },
    ]);
    rs = await Line.populate(rs, { path: "_id", select: "lineNumber" });
    const data = rs.map((item) => {
      return {
        id: item._id._id,
        lineNumber: item._id.lineNumber,
        total: item.total,
      };
    });
    res.status(200).json(data);
  } catch (error) {}
};
export const getQualityLineMonth = async (req, res) => {
  try {
    const { month, year } = req.params;
    const addFields = {
      month: { $month: "$dateSign" },
      year: { $year: "$dateSign" },
    };
    const match = { month: Number(month), year: Number(year) };
    const group = {
      _id: "$line",
      total: { $sum: "$quantity" },
      miss: { $sum: "$missQuantity" },
    };

    let rs = await Doc.aggregate([
      { $addFields: addFields },
      { $match: match },
      { $group: group },
    ]);
    rs = await Line.populate(rs, { path: "_id", select: "lineNumber" });
    if (!rs||rs.length < 1) return res.status(200).json([]);

    const data = rs.map((item) => {
      return {
        id: item._id._id,
        lineNumber: item._id.lineNumber,
        total: item.total,
        miss: item.miss,
      };
    });
    res.status(200).json(data);
  } catch (error) {}
};
export const getQualityTransporterBydate = async (req, res) => {
  try {
    const { bus, startDate, endDate } = req.params;

    const match = {
      $and: [
        { dateSign: { $gte: new Date(startDate), $lte: new Date(endDate) } },
        { transporter: new mongoose.Types.ObjectId(bus) },
      ],
    };
    const group = {
      _id: "$transporter",
      total: { $sum: "$quantity" },
      miss: { $sum: "$missQuantity" },
    };
    let rs = await Doc.aggregate([{ $match: match }, { $group: group }]);
    if (!rs||rs.length < 1) return res.status(200).json({});
    rs = await Bus.populate(rs, { path: "_id", select: "plate" });

    const data = {
      id: rs[0]._id._id,
      bus: rs[0]._id.plate,
      total: rs[0].total,
      miss: rs[0].miss,
    };
    res.status(200).json(data);
  } catch (error) {}
};
export const getQualityLineBydate = async (req, res) => {
  try {
    const { line, startDate, endDate } = req.params;

    const match = {
      $and: [
        { dateSign: { $gte: new Date(startDate), $lte: new Date(endDate) } },
        { line: new mongoose.Types.ObjectId(line) },
      ],
    };
    const group = {
      _id: "$line",
      total: { $sum: "$quantity" },
      miss: { $sum: "$missQuantity" },
    };
    let rs = await Doc.aggregate([{ $match: match }, { $group: group }]);
    if (!rs||rs.length < 1) return res.status(200).json({});

    rs = await Line.populate(rs, { path: "_id", select: "lineNumber" });
    
    const data = {
      id: rs[0]._id._id,
      lineNumber: rs[0]._id.lineNumber,
      total: rs[0].total,
      miss: rs[0].miss,
    };
    res.status(200).json(data);
  } catch (error) {}
};
export const getQualityUnitBydate = async (req, res) => {
  try {
    const { unit, startDate, endDate } = req.params;
    const unitName = await Unit.findById(unit);
    const buses = await Bus.find({ unit: new mongoose.Types.ObjectId(unit) });
    const ids = buses.map((item) => item._id);    
    const match = {
      $and: [
        { dateSign: { $gte: new Date(startDate), $lte: new Date(endDate) } },
        { transporter: { $in: ids } },
      ],
    };
    const group = {
      _id: "$transporter",
      total: { $sum: "$quantity" },
      miss: { $sum: "$missQuantity" },
    };
    let rs = await Doc.aggregate([{ $match: match }, { $group: group }]);
    if (!rs||rs.length < 1) return res.status(200).json({});
    rs = await Bus.populate(rs, { path: "_id", select: "plate" });
    rs = rs.map((item) => {
      return {
        id: item._id._id,
        plate: item._id.plate,
        total: item.total,
        miss: item.miss,
      };
    });
    const data = {
      unit: unit,
      name: unitName.name,
      total: 0,
      miss: 0,
      buses: rs,
    };
    rs.map((item) => {
      data.total += item.total;
      data.miss += item.miss;
    });
    res.status(200).json(data);
  } catch (error) {}
};
