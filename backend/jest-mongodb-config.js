module.exports = {
   mongodbMemoryServerOptions: {
      binary: {
         version: "4.6.0",
         skipMD5: true,
      },
      instance: {
         dbName: "jest",
      },
      autoStart: false,
   },
};
