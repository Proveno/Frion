import dbConnect from "../../../utils/dbConnect";
import Product from "../../../models/Product";

dbConnect();

function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


export default async (req, res) => {
    const {
        query: { search },
        method
    } = req;
    switch (method) {
        case 'GET':
            try {
                const regex = new RegExp(escapeRegex(search), 'gi');

                const keys = await Key.find({ owner: regex});

                if (!keys.length>0) {
                    return res.status(404).json({ success: false });
                }

                res.status(200).json({ success: true, keysData: keys });
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