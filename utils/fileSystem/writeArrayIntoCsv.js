const fs = require('fs');
const { EOL } = require('os');

module.exports.writeArrayIntoCsvAsync = (
  path,
  records,
  headers = null,
  delimiter = ','
) => {
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

    let line = '';

    if (headers) {
      for (let header of headers) {
        line += header + delimiter;
      }
      if (line[line.length - 1] === delimiter) {
        line = line.substr(0, line.length - 1);
      }
      stream.write(line + EOL);
    }

    for (let record of records) {
      line = '';
      for (let key of Object.keys(record)) {
        line += record[key] + delimiter;
      }
      if (line[line.length - 1] === delimiter) {
        line = line.substr(0, line.length - 1);
      }
      stream.write(line + EOL);
    }

    stream.end();
  });
};
