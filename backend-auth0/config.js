module.exports = {
  port: process.env.PORT || 9000,
  jwtOptions: {
    secret: process.env.JWT_SECRET,
  },
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tweb',
};
