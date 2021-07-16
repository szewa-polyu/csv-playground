const fs = require('fs');
const { EOL } = require('os');

module.exports.writeArrayIntoFileAsync = (path, array) => {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(path);

    stream
      // https://nodejs.org/api/stream.html#stream_event_finish
      .on('finish', _ => {
        resolve();
      })
      // https://nodejs.org/api/stream.html#stream_event_finish
      .on('error', err => {
        reject(err);
      });

    for (let element of array) {
      const line = element;
      stream.write(line + EOL);
    }

    stream.end();
  });
};
