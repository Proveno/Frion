import dbConnect from "../../../../utils/dbConnect";
import Giving from "../../../../models/Giving";

dbConnect();

function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


export default async (req, res) => {
    const {
        query: { locale, searchPhone },
        method
    } = req;
    switch (method) {
        case 'GET':
            try {
                const regex = new RegExp(escapeRegex(searchPhone), 'gi');

                const givingByName = await Giving.find({
                    name: regex,
                    requestLocale: locale,
                });
                const givingBySurname = await Giving.find({
                    surname: regex,
                    requestLocale: locale,
                });
                const givingByPhone = await Giving.find({
                    phone: regex,
                    requestLocale: locale,
                });
                const givingByEmail = await Giving.find({
                    email: regex,
                    requestLocale: locale,
                });
                const givingByCategory = await Giving.find({
                    category: regex,
                    requestLocale: locale,
                });
        
        
                
                const allGet = [
                  ...givingByName,
                  ...givingBySurname,
                  ...givingByPhone,
                  ...givingByEmail,
                  ...givingByCategory
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

                if (!unique.length>0) {
                    return res.status(404).json({ success: false });
                }

                res.status(200).json({ success: true, givingRequestData: unique });
            }
            catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }

}