const { readdir } = require('fs/promises');
const path = require('path');
const {
  readCsvIntoArrayAsync
} = require('./utils/fileSystem/readCsvIntoArray');
const {
  writeArrayIntoFileAsync
} = require('./utils/fileSystem/writeArrayIntoFile');

const csvMergeAsync = async _ => {
  // https://stackoverflow.com/questions/32511789/looping-through-files-in-a-folder-node-js

  const csvFolder = 'data/csv-batch';

  const files = await readdir(csvFolder);

  const csvFiles = await Promise.all(
    files.map(async file => {
      const { records, headers } = await readCsvIntoArrayAsync(
        path.join(csvFolder, file),
        -1,
        true
      );
      return records;
    })
  );

  // clean csvFiles
  const cleanedCsvFiles = csvFiles.map(csvFile => {
    return csvFile
      .filter(record => record.Software || record.SoftwareName)
      .map(record => {
        const software = record.Software || record.SoftwareName;
        return {
          SN: record.SN,
          Software: software[0] === '"' ? software.substr(1) : software
        };
      });
  });

  // combine the csvFiles into one
  const combinedRecords = {};
  const combinedRecordsNewIdStart = 10000;
  let combinedRecordsNewIdIdx = 0;
  cleanedCsvFiles.forEach(cleanedCsvFile => {
    cleanedCsvFile.forEach(({ SN, Software }) => {
      if (!combinedRecords[SN]) {
        if (Software) {
          combinedRecords[SN] = Software;
        }
      } else {
        if (combinedRecords[SN] !== Software) {
          //console.log(`${combinedRecords[SN]} , ${Software}`);
          combinedRecords[
            (combinedRecordsNewIdStart + combinedRecordsNewIdIdx).toString()
          ] = Software;
          combinedRecordsNewIdIdx++;
        }
      }
    });
  });

  const softwareNames = [...new Set(Object.values(combinedRecords))].sort();

  await writeArrayIntoFileAsync('data/old_sam_softwares.txt', softwareNames);
};

module.exports.csvMergeAsync = csvMergeAsync;
