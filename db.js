const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectToDb = () => {
    console.log(process.env.MONGO_DB_URI);
    mongoose.connect(process.env.MONGO_DB_URI)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports = connectToDb;
