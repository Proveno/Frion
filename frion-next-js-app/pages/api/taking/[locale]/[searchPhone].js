import dbConnect from "../../../../utils/dbConnect";
import Taking from "../../../../models/Taking";

dbConnect();

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export default async (req, res) => {
  const {
    query: { locale, searchPhone },
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const regex = new RegExp(escapeRegex(searchPhone), "gi");

        const takingByName = await Taking.find({
            name: regex,
            requestLocale: locale,
        });
        const takingBySurname = await Taking.find({
            surname: regex,
            requestLocale: locale,
        });
        const takingByPhone = await Taking.find({
            phone: regex,
            requestLocale: locale,
        });
        const takingByEmail = await Taking.find({
            email: regex,
            requestLocale: locale,
        });
        const takingByCategory = await Taking.find({
            category: regex,
            requestLocale: locale,
        });


        
        const allGet = [
          ...takingByName,
          ...takingBySurname,
          ...takingByPhone,
          ...takingByEmail,
          ...takingByCategory
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

        res.status(200).json({ success: true, takingRequestData: unique });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
