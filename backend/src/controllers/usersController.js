import User from "../models/user";

export const displayProfileInfo = async (req, res, next) => {
   const id = req.body._id;
   const user = await User.findById(id);

   if (!user) {
      return res.status(401).send("Invalid User Information. User not found");
   }

   return res.status(200).send(user);
};
