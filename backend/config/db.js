const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log('mongodb connected successfully!');
    })
    .catch(() => {
      console.log('failed to connect to mongodb!');
    });
};

module.exports = connectDB;
