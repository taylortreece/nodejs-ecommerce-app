import bcrypt from "bcrypt";

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
