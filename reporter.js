import _ from 'lodash';
import { readFile, log, writeFile } from './utils.js';

const pathDictFile = './vocabularies.json',
  pathWordClassFile = './data/wordclasses_aronym_prefix.json',
  pathDictHashTableFile = './data/vocabularies.hashtable.json';

async function reportWordClassEnglish() {
  var wordClasses = JSON.parse(await readFile(pathWordClassFile));
  let report = _.countBy(wordClasses);
  log(report);
}
/**
 * vocabularies.json is array json
 * vocabularies.hashtable.json is a json oject with key and value , key is a word
 *  -> so this file is filterd duplicated words
 *  -> so funtion only work for "vocabularies.json" file
 */
async function reportDuplicateWord() {
  var words = JSON.parse(await readFile(pathDictFile));
  const counts = _.countBy(words, 'word');
  const duplicates = Object.keys(counts).filter((key) => counts[key] > 1);
  log(duplicates.length);
  log(duplicates);
  writeFile('duplicateVocalularies.json', JSON.stringify(duplicates));
}

async function getQuantityVocalulary() {
  var vocabularies = JSON.parse(await readFile(pathDictFile));
  log(vocabularies.length);
}

function listWordWithoutPronunciation(words) {
  // const result = _.keys(
  //   _.pickBy(
  //     words,
  //     (o) => o.pronunciation === '' && o.shortMeaning.indexOf('xem') === -1
  //   )
  // );
  // let report = result.filter(
  //   (word) => word.split(' ').length == 1 && word.split('-').length == 1
  // );
  //log(report);
  let report = _.keys(_.pickBy(words, (o) => o.pronunciation === ''));
  return report;
}

function listWordWithoutWordClass(words) {
  let report = _.keys(_.pickBy(words, (o) => o.wordClass.length === 0));
  return report;
}
function countWordClasses(words) {
  const counts = _.countBy(
    _.flatMap(_.values(words), (item) => {
      return item.wordClass;
    })
  );
  log(counts);
}
function listSingleWords(words) {
  const keys = Object.keys(words);
  let report = keys.filter(
    (key) => key.split(' ').length === 1 && key.split('-').length === 1
  );
  return report;
}
function listCompundWords(words) {
  const keys = Object.keys(words);
  let report = keys.filter(
    (key) => key.split(' ').length > 1 || key.split('-').length > 1
  );
  return report;
}

function listSingleWordWithoutPronunciation(words) {
  let singleWords = listSingleWords(words);
  let withoutPronunciationWords = listWordWithoutPronunciation(words);
  return _.intersection(singleWords, withoutPronunciationWords);
}
function listSingleWordWithPronunciation(words) {
  let singleWords = listSingleWords(words);
  let report = singleWords.filter((word) => {
    return words[word].pronunciation !== '';
  });
  return report;
}
function listCompoundWordWithoutPronunciation(words) {
  let compoundWords = listCompundWords(words);
  let withoutPronunciationWords = listWordWithoutPronunciation(words);
  return _.intersection(compoundWords, withoutPronunciationWords);
}
function listCompoundWordWithPronunciation(words) {
  let compoundWords = listCompundWords(words);
  let report = compoundWords.filter((word) => {
    return words[word].pronunciation !== '';
  });
  return report;
}
function listSingleWordWithoutWordClass(words) {
  let singleWords = listSingleWords(words);
  let withoutWCWords = listWordWithoutWordClass(words);
  return _.intersection(singleWords, withoutWCWords);
}
function listCompoundWordWithoutWordClass(words) {
  let compoundWords = listCompundWords(words);
  let withoutWCWords = listWordWithoutWordClass(words);
  return _.intersection(compoundWords, withoutWCWords);
}

function listSingleWordWithWC(words) {
  let singleWords = listSingleWords(words);
  let report = singleWords.filter((word) => {
    return words[word].wordClass.length > 0;
  });
  return report;
}
function listCompoundWordWithWC(words) {
  let compoundWords = listCompundWords(words);
  let report = compoundWords.filter((word) => {
    return words[word].wordClass.length > 0;
  });
  return report;
}
function listSingleWordWithWCPC(words) {
  let singleWords = listSingleWords(words);
  let report = singleWords.filter((word) => {
    return words[word].wordClass.length > 0 && words[word].pronunciation !== '';
  });
  return report;
}
function listCompoundWordWithWCPC(words) {
  let compoundWords = listCompundWords(words);
  let report = compoundWords.filter((word) => {
    return words[word].wordClass.length > 0 && words[word].pronunciation !== '';
  });
  return report;
}
async function listWordByWCAndEndWith({ wc, endWith, startWith }) {
  var words = JSON.parse(await readFile(pathDictHashTableFile));
  let vocabularies = Object.keys(words);
  let report = vocabularies.filter((word) => {
    return (
      word.endsWith(endWith) &&
      words[word].wordClass.find(
        (c) =>
          c === wc && (startWith ? word.substring(0, 1) === startWith : true)
      )
    );
  });
  log(report);
  return report;
}
/**
 * This report only work for vocabularies.hashtable.json
 * (this file is filtered duplicated words)
 */
async function reportSummary() {
  var words = JSON.parse(await readFile(pathDictHashTableFile));
  countWordClasses(words);
  let reports = {
    'Total Words': Object.keys(words).length,
    'Single Words': listSingleWords(words).length,
    'Compound Words': listCompundWords(words).length,

    'Single Words Without Pronunciation':
      listSingleWordWithoutPronunciation(words).length,
    'Compund Words Without Pronunciation':
      listCompoundWordWithoutPronunciation(words).length,
    'Word Without Pronunciation': listWordWithoutPronunciation(words).length,

    'Single Words Without Word Class':
      listSingleWordWithoutWordClass(words).length,
    'Compund Words Without Word Class':
      listCompoundWordWithoutWordClass(words).length,
    'Words Without Word Class': listWordWithoutWordClass(words).length,

    'Single Words With Pronunciation':
      listSingleWordWithPronunciation(words).length,
    'Compound Words With Pronunciation':
      listCompoundWordWithPronunciation(words).length,

    'Single Words With Word Class': listSingleWordWithWC(words).length,
    'Compound Words With Word Class': listCompoundWordWithWC(words).length,

    'Single Words With WC & PC': listSingleWordWithWCPC(words).length,
    'Compound Words With WC & PC': listCompoundWordWithWCPC(words),
  };
  log(reports);
}

(async () => {
  await listWordByWCAndEndWith({ startWith: 'c', endWith: 'y', wc: 'noun' });
  //await reportSummary();
})();
export {
  reportWordClassEnglish,
  reportDuplicateWord,
  getQuantityVocalulary,
  reportSummary,
};
