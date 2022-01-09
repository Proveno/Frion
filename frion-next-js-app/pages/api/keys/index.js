import dbConnect from "../../../utils/dbConnect";
import Key from "../../../models/Key";
import hexSha1 from "hex-sha1";
dbConnect();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const keys = await Key.find({});
        if (!keys.length > 0) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, keysData: keys });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        var generated = "";
        const possible =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 20; i++)
          generated += possible.charAt(
            Math.floor(Math.random() * possible.length)
          );
        req.body.key = hexSha1(generated);
        const newKey = await Key.create(req.body);
        res.status(201).json({ success: true, data: generated });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
