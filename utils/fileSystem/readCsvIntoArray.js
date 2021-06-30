const { readFileLineAsync } = require('./readFileLine');

module.exports.readCsvIntoArrayAsync = async (
  csvPath,
  keyIdx = -1,
  isWithHeader = false,
  delimiter = ','
) => {
  const isSetKeyForRecords = keyIdx >= 0;

  const records = isSetKeyForRecords ? {} : [];
  let headers = [];

  const fileLineReader = (line, isFirstLine) => {
    if (isWithHeader && isFirstLine) {
      headers = line.split(delimiter);
    } else {
      const fields = line.split(delimiter);

      const newRecord = {};
      for (let i = 0; i < headers.length; i++) {
        newRecord[headers[i]] = fields[i];
      }

      if (isSetKeyForRecords) {
        records[
          fields[keyIdx] ? fields[keyIdx].toUpperCase() : fields[keyIdx]
        ] = newRecord;
      } else {
        records.push(newRecord);
      }
    }
  };

  await readFileLineAsync(csvPath, fileLineReader);

  return {
    records,
    headers
  };
};
