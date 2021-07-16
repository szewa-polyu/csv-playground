const startAsync = async _ => {
  //await require('./csvDiff').csvDiffAsync();
  await require('./csvMerge').csvMergeAsync();
};

startAsync();
