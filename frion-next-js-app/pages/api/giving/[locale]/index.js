import dbConnect from "../../../../utils/dbConnect";
import Giving from "../../../../models/Giving";

dbConnect();

export default async (req, res)=>{
    const { query: { locale }, method } = req;

    switch(method){
        case 'GET':
            try{
                const requests = await Giving.find({requestLocale: locale}).sort({'_id': -1});
                res.status(200).json({success: true, givingRequestData: requests});
            }catch(error){
                res.status(400).json({success: false});

            }
            break;
        default: 
            res.status(400).json({success: false});
            break
    }
}