import dbConnect from "../../../utils/dbConnect";
import Taking from "../../../models/Taking";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const requests = await Taking.find({}).sort({'_id': -1});
        if (!requests.length > 0) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, takingReqData: requests });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const newRequest = await Taking.create(req.body);

        res.status(201).json({ success: true, generatedTakingReqData: newRequest });
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
