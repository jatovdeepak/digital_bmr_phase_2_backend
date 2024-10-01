const express = require('express');
const multer = require('multer');
const { convertDocToHtml } = require('../controllers/convertController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/convert', upload.single('docFile'), convertDocToHtml);

module.exports = router;
