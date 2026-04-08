const mongoose = require('mongoose');
const User = require('../src/models/user.model');
const dotenv = require('dotenv');

dotenv.config();

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bulk_user_db');
        const count = await User.countDocuments();
        console.log(`Total Users in DB: ${count}`);
        
        const indexes = await User.collection.getIndexes();
        console.log('Indexes:', JSON.stringify(indexes, null, 2));
        
        const sample = await User.findOne({ kycStatus: 'Approved' });
        if (sample) {
            console.log('Sample Updated User:', JSON.stringify(sample, null, 2));
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkDB();
