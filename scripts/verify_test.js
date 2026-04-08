const axios = require('axios');

const generateUsers = (count) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        users.push({
            fullName: `User ${i}`,
            email: `user${i}@example.com`,
            phone: (1000000000 + i).toString(), // Unique 10-digit numeric string
            walletBalance: Math.floor(Math.random() * 1000),
            deviceInfo: {
                ipAddress: '127.0.0.1',
                deviceType: 'Desktop',
                os: 'Windows'
            }
        });
    }
    return users;
};

const runTest = async () => {
    const userCount = 5000;
    console.log(`Generating ${userCount} users...`);
    const users = generateUsers(userCount);

    try {
        console.log('Sending bulk-create request...');
        const createResponse = await axios.post('http://localhost:5000/api/users/bulk-create', users);
        console.log('Bulk Create Success:', createResponse.data.message, 'Count:', createResponse.data.count);

        console.log('Preparing bulk-update request (modifying walletBalance for first 100 users)...');
        const updates = users.slice(0, 100).map(u => ({
            email: u.email,
            update: { walletBalance: 9999, kycStatus: 'Approved' }
        }));

        const updateResponse = await axios.put('http://localhost:5000/api/users/bulk-update', updates);
        console.log('Bulk Update Success:', updateResponse.data.message, 'Modified:', updateResponse.data.modifiedCount);

    } catch (error) {
        console.error('Test Failed:', error.response ? error.response.data : error.message);
    }
};

runTest();
