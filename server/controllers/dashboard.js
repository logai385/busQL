import Doc from "../model/TransportDocument.js";
import Line from "../model/Line.js";

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
export const getQualityUnitBydate = async (req, res) => {
  try {
    const { dateSign } = req.params;
    
    const match = { line:"62447ace29857e6caefbae9e" } ;
    const group = { _id: "$line", total: { $sum: "$quantity" } };
    let rs = await Doc.aggregate([ { $match:match},{ $group: group }]);
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
