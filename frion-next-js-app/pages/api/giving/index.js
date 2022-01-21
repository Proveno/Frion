import dbConnect from "../../../utils/dbConnect";
import Giving from "../../../models/Giving";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const requests = await Giving.find({}).sort({'_id': -1});
        if (!requests.length > 0) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, givingReqData: requests });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const newRequest = await Giving.create(req.body);

        res.status(201).json({ success: true, generatedGivingReqData: newRequest });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
