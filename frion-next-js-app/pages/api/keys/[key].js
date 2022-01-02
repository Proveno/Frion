import dbConnect from "../../../utils/dbConnect";
import Key from "../../../models/Key";
import hexSha1 from 'hex-sha1';
dbConnect();

export default async (req, res) => {
  const {
    query: { key },
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const FoundKey = await Key.find({ key: hexSha1(key) });
        if (!FoundKey.length>0) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: FoundKey });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deletedProduct = await Product.deleteOne({ key: hexSha1(key) });

        if (!deletedProduct) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
