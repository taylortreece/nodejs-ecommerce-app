import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export const fieldsCheck = (object, array) => {
   for (const value of array) {
      if (!object.hasOwnProperty(value)) {
         return false;
      }
   }
   return true;
};

export const passwordCheck = async (userPwd, encryptedPwd) => {
   return await bcrypt.compare(userPwd, encryptedPwd);
};

export const generateUser = () => {
   return {
      firstName: "John",
      lastName: "Doe",
      email: `${uuid()}@email.com`,
      password: `${uuid()}`,
   };
};
