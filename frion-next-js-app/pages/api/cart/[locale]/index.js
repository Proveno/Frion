import dbConnect from "../../../../utils/dbConnect";
import Cart from "../../../../models/Cart";

dbConnect();

export default async (req, res)=>{
    const { query: { locale }, method } = req;

    switch(method){
        case 'GET':
            try{
                const orders = await Cart.find({orderLocale: locale}).sort({'_id': -1});
                res.status(200).json({success: true, ordersData: orders});
            }catch(error){
                res.status(400).json({success: false});

            }
            break;
        default: 
            res.status(400).json({success: false});
            break
    }
}