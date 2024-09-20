import express from "express";

import { createFile, getFiles } from "./file-system.js";
const server = express();

// Endpoint to create a text file in the 'files' folder with the current timestamp as content
server.post("/create_file", (request, response) => {
  const currentDate = new Date();
  const timestamp = currentDate.getTime().toString();
  const fileName = `${currentDate.toISOString().replace(/[:.]/g, "-")}.txt`; // Ensures valid filename format

  createFile("./files", fileName, timestamp, () => {
    response.status(201).json({ msg: "File created successfully", fileName });
  });
});

// Endpoint to retrieve all text files from the 'files' folder
server.get("/get_files", (request, response) => {
  getFiles("./files", (err, data) => {
    if (err) {
      return response
        .status(500)
        .json({ msg: "Error reading files", error: err });
    }
    return response.status(200).json({ files: data });
  });
});

const PORT = 7700;

server.listen(PORT, () => {
  console.log("Server running on", PORT);
});
