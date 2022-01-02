import dbConnect from "../../../utils/dbConnect";
import Key from "../../../models/Key";
import hexSha1 from 'hex-sha1';
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "POST":
        try {
          var generated = "";
          const possible =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          for (let i = 0; i < 20; i++)
            generated += possible.charAt(
              Math.floor(Math.random() * possible.length)
            );
  
          const newKey = await Key.create({ key: hexSha1(generated)});
          res.status(201).json({ success: true, data: generated });
        } catch (error) {
          res.status(400).json({ success: false });
        }
        break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};