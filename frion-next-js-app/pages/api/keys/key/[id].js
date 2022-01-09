import dbConnect from "../../../../utils/dbConnect";
import Key from "../../../../models/Key";
dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const key = await Key.findById(id);
        if (!key) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, keyData: key });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const key = await Key.findById(id);

        if (!key) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, keyData: key });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deletedKey = await Key.deleteOne({ _id: id });

        if (!deletedKey) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, keyData: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
