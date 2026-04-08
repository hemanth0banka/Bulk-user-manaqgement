const mongoose = require('mongoose');
const User = require('../src/models/user.model');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const exportData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bulk_user_db');
        
        console.log('Fetching users from database...');
        const users = await User.find({}).lean();
        
        console.log(`Found ${users.length} users. Exporting to JSON...`);
        fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
        console.log('users.json created successfully.');

        // For BSON, we'll try to create a folder and save a representation 
        // since we don't have mongodump. 
        // Note: Real BSON format requires the 'bson' library or mongodump.
        // We'll provide a message about the tools.
        if (!fs.existsSync('db_backup')) {
            fs.mkdirSync('db_backup');
        }
        
        console.log('Database export complete (JSON only due to missing MongoDB Tools).');
        process.exit(0);
    } catch (error) {
        console.error('Export Error:', error);
        process.exit(1);
    }
};

exportData();
