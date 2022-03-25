const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { dateToDashesWithTime } = require("./formatDate");

const logEvents = async (message, logFileName) => {
  const dateTime = `${dateToDashesWithTime(new Date())}`;
  const fileName = path.join(__dirname, "../logs", logFileName);
  const logItem = `${dateTime}\t${message}\n`;

  try {
    await fsPromises.appendFile(fileName, logItem);
  } catch (err) {
    console.log(err);
  }
};

module.exports = logEvents;
