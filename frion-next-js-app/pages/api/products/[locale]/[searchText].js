import dbConnect from "../../../../utils/dbConnect";
import Product from "../../../../models/Product";

dbConnect();

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export default async (req, res) => {
  const {
    query: { locale, searchText },
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const regex = new RegExp(escapeRegex(searchText), "gi");

        const productsByTitle = await Product.find({
          title: regex,
          productLocale: locale,
        });
        const productsByDesc = await Product.find({
          description: regex,
          productLocale: locale,
        });
        const productsByCategory = await Product.find({
          category: regex,
          productLocale: locale,
        });
        const allGet = [
          ...productsByTitle,
          ...productsByDesc,
          ...productsByCategory,
        ];
        const ids = [...new Set(allGet
          .map((e) => {
            return e._id.toString();
          }))];
        const unique = ids
          .map((p) => {
            for (let i = 0; i < allGet.length; i++) {
              if (allGet[i]._id.toString() == p) {
                return allGet[i];
              }
            }
          });
        if (!unique.length > 0) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: unique });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
