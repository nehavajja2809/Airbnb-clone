const mongoose = require('mongoose');

const connectWithDB = () => {
  mongoose.set('strictQuery', false);
  mongoose.connect('mongodb+srv://newuser:nehapranathi123@cluster0.70smp5r.mongodb.net/Cluster0?retryWrites=true&w=majority')
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((err) => {
    console.log("DB connection failed");
    console.error(err);
    process.exit(1);
  });

};

module.exports = connectWithDB;
