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

                const request = await Giving.find({ phone: regex, requestLocale: locale});

                if (!request.length>0) {
                    return res.status(404).json({ success: false });
                }

                res.status(200).json({ success: true, givingRequestData: request });
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