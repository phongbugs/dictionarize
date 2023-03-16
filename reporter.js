import _ from 'lodash';
import { readFile, log, writeFile } from './utils.js';
const pathDictFile = './vocabularies.json',
  pathWordClassFile = './data/wordclasses_aronym_prefix.json';
async function reportWordClassEnglish() {
  var wordClasses = JSON.parse(
    await readFile(pathWordClassFile)
  );
  let report = _.countBy(wordClasses);
  log(report);
}
async function reportDuplicateWord() {
  var words = JSON.parse(await readFile(pathDictFile));
  const counts = _.countBy(words, 'word');
  const duplicates = Object.keys(counts).filter((key) => counts[key] > 1);
  log(duplicates.length);
  log(duplicates);
  writeFile('duplicateVocalularies.json', JSON.stringify(duplicates));
}
async function getQuantityVocalulary() {
  var vocabularies = JSON.parse(
    await readFile(pathDictFile)
  );
  log(vocabularies.length);
}
async function reportWordByPronunciation(pronunciationVal) {
  var words = JSON.parse(
    await readFile(pathDictFile)
  );
  const counts = _.countBy(words, function (word) {
    let flag = word.pronunciation.indexOf(pronunciationVal) > -1;
    //if (flag) log(word);
    return flag;
  });
  log(counts);
}
async function findDuplicateWordAndWithoutPronunciation(pathFileDictHashTable) {
  var words = JSON.parse(
    await readFile(pathDictFile)
  );
  const counts = _.countBy(words, function (word) {
    let flag = word.pronunciation.indexOf("undefined") > -1 
    //if (flag) log(word);
    return flag;
  });
  log(counts);
}
reportWordByPronunciation('undefined');
reportWordClassEnglish();
reportDuplicateWord();
/**
 * Note
 * ! vài từ bị nên coi lại
 */
export { reportWordClassEnglish, reportDuplicateWord, getQuantityVocalulary };
