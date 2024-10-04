const fs = require('fs');
const path = require('path');

// Function to create a folder
const createFolder = (folderName) => {
    const dir = path.join(__dirname, folderName);
    
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        console.log(`Directory '${folderName}' created.`);
    } else {
        console.log(`Directory '${folderName}' already exists.`);
    }
};

// Function to create a file inside a folder and write content to it
const createFile = (folderName, fileName, content) => {
    const dir = path.join(__dirname, folderName);
    
    if (!fs.existsSync(dir)) {
        console.error(`Directory '${folderName}' does not exist.`);
        return;
    }

    const filePath = path.join(dir, fileName);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`File '${fileName}' created in '${folderName}' with content.`);
};

module.exports = { createFolder, createFile };
