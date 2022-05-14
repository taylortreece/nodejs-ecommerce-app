import mongoose from 'mongoose';
const { MONGO_URI } = process.env;

export const connect = async () => {
   try {
      await mongoose.connect(MONGO_URI);
      console.log('DB Connection Successful');
   } catch (err) {
      console.log('DB Connection Error: ', err);
   }
};

export const disconnect = async (done) => {
   try {
      await mongoose.diconnect(done);
      console.log('DB Disconnection Successful');
   } catch (err) {
      console.log('DB Disonnection Error: ', err);
   }
};
