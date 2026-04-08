const mongoose = require('mongoose');
const User = require('../src/models/user.model');
const dotenv = require('dotenv');

dotenv.config();

const clearDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bulk_user_db');
        await User.deleteMany({});
        console.log('Database cleared');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

clearDB();
