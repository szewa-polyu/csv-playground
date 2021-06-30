const fs = require('fs');
const readline = require('readline');

const handleReadLineDefault = _ => {
  console.log(line);
};

module.exports.readFileLineAsync = async (
  path,
  onReadLine = handleReadLineDefault
) =>
  new Promise((resolve, reject) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(path)
      //output: process.stdout,
    });

    let isFirstLine = true;

    readInterface
      .on('line', line => {
        onReadLine(line, isFirstLine);
        isFirstLine = false;
      })
      .on('close', line => {
        // end of file
        resolve(line);
      });
  });
