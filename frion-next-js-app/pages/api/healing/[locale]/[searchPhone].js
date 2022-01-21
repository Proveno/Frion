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

                const request = await Healing.find({ phone: regex, requestLocale: locale});

                if (!request.length>0) {
                    return res.status(404).json({ success: false });
                }

                res.status(200).json({ success: true, healingRequestData: request });
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