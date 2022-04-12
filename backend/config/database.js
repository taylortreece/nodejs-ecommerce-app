const { MONGO_URI } = process.env;
const mongoose = require("mongoose");

module.exports = {
  mongoose,
  connect: async () => {
    try {
      await mongoose.connect(MONGO_URI);
      // console.log("DB Connection Successful.")
    } catch(err) {
      console.log("DB Connection Error: ", err)
    }
  },
  disconnect: async (done) => {
    try {
      await mongoose.diconnect(done);
      console.log("DB Disconnection Successful.")
    } catch(err) {
      console.log("DB Disonnection Error: ", err)
    }
  },
};