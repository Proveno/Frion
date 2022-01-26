import dbConnect from "../../../../utils/dbConnect";
import Cart from "../../../../models/Cart";

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




                const cartByName = await Cart.find({
                    name: regex,
                    orderLocale: locale,
                });
                const cartBySurname = await Cart.find({
                    surname: regex,
                    orderLocale: locale,
                });
                const cartByPhone = await Cart.find({
                    phone: regex,
                    orderLocale: locale,
                });
                const cartByEmail = await Cart.find({
                    email: regex,
                    orderLocale: locale,
                });
                
                  const allGet = [
                    ...cartByName,
                    ...cartBySurname,
                    ...cartByPhone,
                    ...cartByEmail
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

                res.status(200).json({ success: true, orderData: unique });
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