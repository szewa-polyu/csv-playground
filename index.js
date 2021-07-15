const { config } = require('./config/config');
const {
  readCsvIntoArrayAsync
} = require('./utils/fileSystem/readCsvIntoArray');
const {
  writeArrayIntoCsvAsync
} = require('./utils/fileSystem/writeArrayIntoCsv');

const getMapDiff = (map1, map2) => {
  const recordsInMap1NotInMap2 = [];
  for (let map1Key of Object.keys(map1)) {
    if (!map2[map1Key]) {
      recordsInMap1NotInMap2.push(map1[map1Key]);
    }
  }
  return recordsInMap1NotInMap2;
};

const startAsync = async _ => {
  // file1 from SAM report, keyIdx 3 is SAM No., 5 is Computer Name
  const { records: records1, headers: headers1 } = await readCsvIntoArrayAsync(
    config.inFile1,
    5, //3,
    true
  );

  // file2 from CEIS, keyIdx 2 is SAM No., 4 is Computer Name
  const { records: records2, headers: headers2 } = await readCsvIntoArrayAsync(
    config.inFile2,
    4, //2,
    true
  );

  // file3 from Zenworks, 0 is Computer Name
  const { records: records3, headers: headers3 } = await readCsvIntoArrayAsync(
    config.inFile3,
    0,
    true
  );

  console.log('load csv completed.');

  // records2 not in records1
  const records2NotInRecords1 = getMapDiff(records2, records1);

  // records2 not in records3
  const records2NotInRecords3 = getMapDiff(records2, records3);

  console.log('records1 length: ' + Object.keys(records1).length);
  //console.log(records1);
  console.log('records2 length: ' + Object.keys(records2).length);
  //console.log(records2);
  console.log('records3 length: ' + Object.keys(records3).length);
  //console.log(records3);
  console.log('records2NotInRecords1 length: ' + records2NotInRecords1.length);
  //console.log(records2NotInRecords1);
  console.log('records2NotInRecords3 length: ' + records2NotInRecords3.length);
  // //console.log(records2NotInRecords3);

  const outputRecords = [];
  for (let record2NotInRecords1Key of Object.keys(records2NotInRecords1)) {
    outputRecords.push(records2NotInRecords1[record2NotInRecords1Key]);
  }

  await writeArrayIntoCsvAsync('data/output.csv', outputRecords, headers2);
  console.log('Writing to output.csv completed');
};

startAsync();
