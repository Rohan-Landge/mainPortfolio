const express = require('express');
const router = express.Router();
const { handleContact } = require('../controllers/contactController');

/**
 * POST /
 *
 * This router is mounted at `/api/contact` in `server.js`.
 */
router.post('/', handleContact);

module.exports = router;
