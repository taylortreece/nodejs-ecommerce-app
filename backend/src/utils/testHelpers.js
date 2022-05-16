export const fieldsCheck = (object, array) => {
   for (const value of array) {
      if (!object.hasOwnProperty(value)) {
         return false;
      }
   }
   return true;
};
