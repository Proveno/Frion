import dbConnect from "../../../../utils/dbConnect";
import Taking from "../../../../models/Taking";
import Giving from "../../../../models/Giving";
import Healing from "../../../../models/Healing";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const taking = await Taking.findById(id);
        if (taking) {
            return res.status(200).json({ success: true, allRequestData: taking });
        }
        const giving = await Giving.findById(id);
        if (giving) {
            return res.status(200).json({ success: true, allRequestData: giving });
        }
        const healing = await Healing.findById(id);
        if (healing) {
            return res.status(200).json({ success: true, allRequestData: healing });
        }
        return res.status(400).json({ success: false });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const request = await Taking.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!request) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, takingRequestData: request });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
      case 'DELETE':
        try{
            const deletedRequest = await Taking.deleteOne({ _id: id});

            if(!deletedRequest){
                return res.status(400).json({ success: false }); 
            }
            res.status(200).json({ success: true, data: {} });
        }catch(error){
            res.status(400).json({ success: false });
        }
        break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
