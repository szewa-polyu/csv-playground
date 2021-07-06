module.exports.config = {
  // for csv files created from excel files, should replace all ',' with ';' in excel first,
  // should also remove line breaks
  // e.g. https://www.ablebits.com/office-addins-blog/2013/12/03/remove-carriage-returns-excel/
  // in the script, i called Replace(MyRange, Chr(13) & Chr(10), ";")
  inFile1: '/path/to/file1.csv',
  inFile2: '/path/to/file2.csv',
  inFile2: '/path/to/file3.csv'
};
