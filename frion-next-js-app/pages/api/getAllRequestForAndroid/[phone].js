import dbConnect from "../../../utils/dbConnect";
import Taking from "../../../models/Taking";
import Giving from "../../../models/Giving";
import Healing from "../../../models/Healing";


dbConnect();

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export default async (req, res) => {
  const {
    query: { phone },
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const regex = new RegExp(escapeRegex(phone), "gi");

        const taking = await Taking.find({
            phone: regex,
        });
        const giving = await Giving.find({
            phone: regex,
        });
        const healing = await Healing.find({
            phone: regex,
        });



        
        const allGet = [
          ...taking,
          ...giving,
          ...healing
        ];
        
        if (!allGet.length > 0) {
          return res.status(404).json({ success: false });
        }

        res.status(200).json({ success: true, allRequestData: allGet });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
