import dbConnect from "../../../../utils/dbConnect";
import Category from "../../../../models/Category";

dbConnect();

export default async (req, res) => {
  const {
    query: { locale, id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const categoryR = await Category.findById(id);
        res.status(200).json({ success: true, dataCategories: categoryR });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        console.log(req.body);
        const category = await Category.findByIdAndUpdate(
          id,
          req.body, {
            new: true,
            runValidators: true
        }
        );

        if (!category) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, dataCategories: category });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "DELETE":
      try {
        const deleted = await Category.findByIdAndDelete(id);

        if (!deleted) {
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
