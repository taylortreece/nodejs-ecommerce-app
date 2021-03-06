import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res, next) => {
   try {
      const { firstName, lastName, email, password } = req.body;

      if (!(email && password && firstName && lastName)) {
         res.status(400).send("All inputs are required");
      }

      // check if user already exists
      // validate if user exists in our database
      const oldUser = await User.findOne({ email });

      if (oldUser) {
         return res.status(409).send("User already exists. Please login.");
      }

      // encrypt user password
      const encrypedUserPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
         first_name: firstName,
         last_name: lastName,
         email: email.toLowerCase(),
         password: encrypedUserPassword,
      });

      // create token
      const token = jwt.sign(
         { user_id: user._id, email },
         process.env.TOKEN_KEY,
         { expiresIn: "5h" }
      );

      user.token = token;

      res.status(201).json(user);
   } catch (err) {
      // TODO: Add morgan to register error
      console.log(err);
   }
};

// LOGIN
export const login = async (req, res, next) => {
   try {
      // Get user input
      const { email, password } = req.body;
      // Validate user input
      if (!(email && password)) {
         return res.status(400).send("All input is required");
      }

      // Validate if user exist in our database
      const user = await User.findOne({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
         //Create token
         const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
               expiresIn: "24h",
            }
         );
         // Save user token
         user.token = token;

         return res.status(200).json(user);
      }

      return res.status(400).send("Invalid Credentials");
   } catch (err) {
      return res.status(400).send("error");
   }
};
