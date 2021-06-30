const { config } = require('./config/config');
const {
  readCsvIntoArrayAsync
} = require('./utils/fileSystem/readCsvIntoArray');
const {
  writeArrayIntoCsvAsync
} = require('./utils/fileSystem/writeArrayIntoCsv');

const startAsync = async _ => {
  // file1 from SAM, keyIdx 3 is SAM No.
  const { records: records1, headers: headers1 } = await readCsvIntoArrayAsync(
    config.inFile1,
    3,
    true
  );

  // file2 from CEIS, keyIdx 2 is SAM No.
  const { records: records2, headers: headers2 } = await readCsvIntoArrayAsync(
    config.inFile2,
    2,
    true
  );

  console.log('csv-playground completed.');

  // records2 not in records1
  const records2NotInRecords1 = [];
  for (let records2Key of Object.keys(records2)) {
    if (!records1[records2Key]) {
      records2NotInRecords1.push(records2[records2Key]);
    }
  }

  console.log(Object.keys(records1).length);
  console.log(Object.keys(records2).length);
  console.log(records2NotInRecords1.length);
  //console.log(records2NotInRecords1);

  const outputRecords = [];
  for (let record2NotInRecords1Key of Object.keys(records2NotInRecords1)) {
    outputRecords.push(records2NotInRecords1[record2NotInRecords1Key]);
  }

  writeArrayIntoCsvAsync('data/output.csv', outputRecords, headers2);
};

startAsync();
