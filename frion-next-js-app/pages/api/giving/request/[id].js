import dbConnect from "../../../../utils/dbConnect";
import Giving from "../../../../models/Giving";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const request = await Giving.findById(id);

        if (!request) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, givingRequestData: request });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const request = await Giving.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!request) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, givingRequestData: request });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
      case 'DELETE':
        try{
            const deletedRequest = await Giving.deleteOne({ _id: id});

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
