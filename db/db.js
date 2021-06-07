// libraries and constants

const mongoose = require('mongoose');
const URI = 'mongodb+srv://marblezstars:go6oneaka@roommate.o1zfc.mongodb.net/roomMate?retryWrites=true&w=majority'

// connect to the database

const connectDB = async() => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    console.log('Connected to MongoDB Atlas cloud database.');
}

module.exports = connectDB;