import dbConnect from "../../../../utils/dbConnect";
import Product from "../../../../models/Product";

dbConnect();

function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


export default async (req, res) => {
    const {
        query: { locale, searchText },
        method
    } = req;
    switch (method) {
        case 'GET':
            try {
                const regex = new RegExp(escapeRegex(searchText), 'gi');

                const product = await Product.find({ title: regex, productLocale: locale}).sort({'_id': -1});

                if (!product.length>0) {
                    return res.status(404).json({ success: false });
                }

                res.status(200).json({ success: true, data: product });
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