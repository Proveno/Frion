import dbConnect from "../../../../utils/dbConnect";
import Taking from "../../../../models/Taking";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const request = await Taking.findById(id);

        if (!request) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, takingRequestData: request });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        req.body.archivedAt = new Date();
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
