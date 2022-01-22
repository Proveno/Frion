import dbConnect from "../../../utils/dbConnect";
import Cart from "../../../models/Cart";

dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const orders = await Cart.find({}).sort({'_id': -1});
        if (!orders.length > 0) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, orderData: orders });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const newOrder = await Cart.create(req.body);

        res.status(201).json({ success: true, generatedOrderData: newOrder });
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
