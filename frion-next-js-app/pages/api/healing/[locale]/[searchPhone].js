import dbConnect from "../../../../utils/dbConnect";
import Healing from "../../../../models/Healing";

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



                const healingByName = await Healing.find({
                    name: regex,
                    requestLocale: locale,
                });
                const healingBySurname = await Healing.find({
                    surname: regex,
                    requestLocale: locale,
                });
                const healingByPhone = await Healing.find({
                    phone: regex,
                    requestLocale: locale,
                });
                const healingByEmail = await Healing.find({
                    email: regex,
                    requestLocale: locale,
                });
                const healingByCategory = await Healing.find({
                    category: regex,
                    requestLocale: locale,
                });
        
        
                
                const allGet = [
                  ...healingByName,
                  ...healingBySurname,
                  ...healingByPhone,
                  ...healingByEmail,
                  ...healingByCategory
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

                res.status(200).json({ success: true, healingRequestData: unique });
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