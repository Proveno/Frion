import dbConnect from "../../../../utils/dbConnect";
import Taking from "../../../../models/Taking";

dbConnect();

export default async (req, res)=>{
    const { query: { locale }, method } = req;

    switch(method){
        case 'GET':
            try{
                const requests = await Taking.find({requestLocale: locale}).sort({'_id': -1});
                res.status(200).json({success: true, takingRequestData: requests});
            }catch(error){
                res.status(400).json({success: false});

            }
            break;
        default: 
            res.status(400).json({success: false});
            break
    }
}