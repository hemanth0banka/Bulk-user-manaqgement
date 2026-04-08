const User = require('../models/user.model');

/**
 * Bulk Create Users
 * Route: POST /api/users/bulk-create
 */
exports.bulkCreate = async (req, res) => {
    try {
        const users = req.body;

        if (!Array.isArray(users)) {
            return res.status(400).json({
                success: false,
                message: 'Body must be an array of users'
            });
        }

        if (users.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'User array cannot be empty'
            });
        }

        // Must use insertMany()
        // { ordered: false } allows the operation to continue even if some documents fail validation (e.g. duplicate keys)
        // This handles "partial failures gracefully"
        const result = await User.insertMany(users, { ordered: false });

        res.status(201).json({
            success: true,
            count: result.length,
            message: 'Users created successfully',
            data: result
        });
    } catch (error) {
        // Handle partial failure error from MongoDB (error code 11000 for duplicate keys)
        if (error.name === 'BulkWriteError' || error.name === 'MongoBulkWriteError') {
            return res.status(207).json({ // 207 Multi-Status
                success: false,
                message: 'Some users could not be created due to validation or duplication',
                insertedCount: error.result.nInserted,
                errors: error.writeErrors.map(e => ({
                    index: e.index,
                    message: e.errmsg
                }))
            });
        }

        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};

/**
 * Bulk Update Users
 * Route: PUT /api/users/bulk-update
 * Expects an array of objects, e.g., [{ email: 'user@example.com', update: { walletBalance: 100 } }]
 */
exports.bulkUpdate = async (req, res) => {
    try {
        const updates = req.body;

        if (!Array.isArray(updates)) {
            return res.status(400).json({
                success: false,
                message: 'Body must be an array of update operations'
            });
        }

        // Prepare bulk operations
        // Must use bulkWrite()
        const bulkOps = updates.map(op => {
            // We'll use email or phone as the identifier for updates
            const filter = op.email ? { email: op.email } : { phone: op.phone };
            
            if (!filter.email && !filter.phone) {
                throw new Error('Each update operation must provide an email or phone as identifier');
            }

            return {
                updateOne: {
                    filter: filter,
                    update: { 
                        $set: { 
                            ...op.update,
                            updatedAt: new Date() // Explicitly updating updatedAt if not using Mongoose timestamps correctly in bulkWrite
                        } 
                    },
                    upsert: false
                }
            };
        });

        const result = await User.bulkWrite(bulkOps);

        res.status(200).json({
            success: true,
            message: 'Bulk update completed',
            matchedCount: result.matchedCount,
            modifiedCount: result.modifiedCount,
            upsertedCount: result.upsertedCount
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    }
};
