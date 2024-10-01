const mammoth = require('mammoth');
const prisma = require('@prisma/client');
const { createFolder, createFile, appendToFile } = require('../CodeCreator/createFiles');
const { PrismaClient } = prisma;

const prismaClient = new PrismaClient();

// Helper function to sanitize the filename
const sanitizeFileName = (fileName) => {
  return fileName
    .replace(/\s+/g, '_')   // Replace spaces with underscores
    .replace(/\W+/g, '')     // Remove special characters like dots (.)
    .replace(/^\d+/, '');    // Remove leading digits if any
};

const convertDocToHtml = async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await mammoth.convertToHtml({ path: file.path });
    const html = result.value;

    // Sanitize the file name for Prisma model usage
    const sanitizedFileName = sanitizeFileName(file.originalname);

    // Save the result to the database
    const newConversion = await prismaClient.fileConversion.create({
      data: {
        fileName: sanitizedFileName,
        html: html,
      },
    });

    // Create folder and file using CodeCreator module
    createFolder('GeneratedHTML');
    createFile('GeneratedHTML', `${sanitizedFileName}.html`, html);

    // Append the new schema model to the Prisma schema
    const schemaPath = './prisma/schema.prisma'; // Modify if needed
    const newSchema = `\nmodel ${sanitizedFileName}_schema {
      id   String @id @default(cuid())
      content String
    }`;
    appendToFile(schemaPath, newSchema);

    res.status(200).json({ html });
  } catch (error) {
    console.error('Error during file conversion:', error);
    res.status(500).json({ error: 'Error converting document' });
  }
};

module.exports = { convertDocToHtml };
