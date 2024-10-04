const mammoth = require('mammoth');
const { PrismaClient } = require('@prisma/client');

const prismaClient = new PrismaClient();

const sanitizeFileName = (fileName) => {
  return fileName
    .replace(/\s+/g, '_')
    .replace(/\W+/g, '')
    .replace(/^\d+/, '');
};

const convertDocToHtml = async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await mammoth.convertToHtml({ path: file.path });
    const html = result.value;

    const sanitizedFileName = sanitizeFileName(file.originalname);

    const newConversion = await prismaClient.fileConversion.create({
      data: {
        fileName: sanitizedFileName,
        html: html,
      },
    });

    res.status(200).json({ html });
  } catch (error) {
    console.error('Error during file conversion:', error);
    res.status(500).json({ error: 'Error converting document' });
  }
};

const getConvertedFiles = async (req, res) => {
  try {
    const files = await prismaClient.fileConversion.findMany();
    res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching converted files:', error);
    res.status(500).json({ error: 'Error fetching files' });
  }
};

const getFileById = async (req, res) => {
  const { id } = req.params;
  try {
    const file = await prismaClient.fileConversion.findUnique({
      where: { id: parseInt(id) },
    });
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.status(200).json(file.html);
  } catch (error) {
    console.error('Error fetching file by ID:', error);
    res.status(500).json({ error: 'Error fetching file' });
  }
};

const deleteFileById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFile = await prismaClient.fileConversion.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json(deletedFile);
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ error: 'Error deleting file' });
  }
};

module.exports = { convertDocToHtml, getConvertedFiles, getFileById, deleteFileById };

