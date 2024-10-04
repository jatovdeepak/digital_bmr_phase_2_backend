const express = require('express');
const multer = require('multer');
const {
  convertDocToHtml,
  getConvertedFiles,
  getFileById,
  deleteFileById
} = require('../controllers/convertController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/convert', upload.single('docFile'), convertDocToHtml);
router.get('/files', getConvertedFiles);
router.get('/files/:id', getFileById); 
router.delete('/files/:id', deleteFileById);

module.exports = router;
