import dbConnect from "../../../../utils/dbConnect";
import Category from "../../../../models/Category";

dbConnect();

export default async (req, res) => {
  const {
    query: { locale, category },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const categoryR = await Category.find({ category: category, categoryLocale:locale });
        res.status(200).json({ success: true, dataCategories: categoryR });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "PUT":
      try {
        const category = await Category.findOneAndUpdate({category: categoryText, categoryLocale:locale }, req.body, {
          new: true,
          runValidators: true,
        });

        if (!category) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, dataCategories: category });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
