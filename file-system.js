import fs from "fs";

export const createFile = (folderpath, fileName, contents, cbFn = () => {}) => {
  if (!fs.existsSync(folderpath)) {
    fs.mkdir(folderpath, () => {
      console.log("folder created");
    });
  }

  fs.writeFile(`${folderpath}/${fileName}`, contents, cbFn);
};

// Utility to get all files from a specific folder
export const getFiles = (folderPath, cbFn) => {
  fs.readdir(folderPath, (err, data) => {
    if (data) {
      cbFn(null, data);
    } else {
      cbFn(err, null);
    }
  });
};
