import dbConnect from "../../../../utils/dbConnect";
import Cart from "../../../../models/Cart";

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const order = await Cart.findById(id);

        if (!order) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, orderData: order });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const order = await Cart.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!order) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, orderData: order });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
      case 'DELETE':
        try{
            const deletedOrder = await Cart.deleteOne({ _id: id});

            if(!deletedOrder){
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
