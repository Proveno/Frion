import dbConnect from "../../../../utils/dbConnect";
import Product from "../../../../models/Product";

dbConnect();

export default async (req, res)=>{
    const { query: { locale }, method } = req;

    switch(method){
        case 'GET':
            try{
                const products = await Product.find({productLocale: locale}).sort({'_id': -1});
                res.status(200).json({success: true, data: products});
            }catch(error){
                res.status(400).json({success: false});

            }
            break;
        default: 
            res.status(400).json({success: false});
            break
    }
}