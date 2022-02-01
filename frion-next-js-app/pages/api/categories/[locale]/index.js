import dbConnect from "../../../../utils/dbConnect";
import Category from "../../../../models/Category";

dbConnect();

export default async (req, res)=>{
    const {
        query: {locale} ,
        method
    } = req;
    switch(method){
        case 'GET':
            try{
                const category = await Category.find({ categoryLocale: locale });
                res.status(200).json({success: true, dataCategories: category});
            }catch(error){
                res.status(400).json({success: false});
            }
            break;
        default: 
            res.status(400).json({success: false});
            break
    }
}