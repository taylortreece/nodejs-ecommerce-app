export const fieldsCheck = (object, array) => {
   for (const value of array) {
      if (!obj.hasOwnProperty(value)) {
         return false;
      }
   }
   return true;
};
