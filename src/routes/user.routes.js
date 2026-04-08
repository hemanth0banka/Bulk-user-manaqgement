const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// @route   POST /api/users/bulk-create
// @desc    Bulk create users
router.post('/bulk-create', userController.bulkCreate);

// @route   PUT /api/users/bulk-update
// @desc    Bulk update users
router.put('/bulk-update', userController.bulkUpdate);

module.exports = router;
