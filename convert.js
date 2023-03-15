import _ from 'lodash';
import { readFile, log } from './utils.js';
/**
 *
 * @param {*} descriptionWordClass refer wordclasses.json
 */
function getWordClasses(partOfSpeeches) {
  let wordClasses = [];
  if (partOfSpeeches.indexOf('đại từ') > -1) wordClasses.push('pronoun');
  if (partOfSpeeches.indexOf('danh từ') > -1) wordClasses.push('noun');
  if (partOfSpeeches.indexOf('động từ') > -1) wordClasses.push('verb');
  if (partOfSpeeches.indexOf('tính từ') > -1) wordClasses.push('adjective');
  if (
    partOfSpeeches.indexOf('phó từ') > -1 ||
    partOfSpeeches.indexOf('trạng từ') > -1
  )
    wordClasses.push('adverb');
  if (partOfSpeeches.indexOf('giới từ') > -1) wordClasses.push('preposition');
  if (partOfSpeeches.indexOf('liên từ') > -1) wordClasses.push('conjunction');
  if (partOfSpeeches.indexOf('thán từ') > -1) wordClasses.push('interjection');
  if (partOfSpeeches.indexOf('mạo từ') > -1) wordClasses.push('article');
  return wordClasses;
}
/**
 *
 * @param {*} paragraph
 * @returns
 */
function convertParagrapToJson(paragraph) {
  let lines = paragraph.split('\n');
  let vocabulary = { word: '', pronunciation: '' };
  let wordClass = [];
  let firstLine = lines[0].split(' /');
  vocabulary['word'] = firstLine[0];
  vocabulary['pronunciation'] = '/' + firstLine[1];
  lines.forEach((line, index) => {
    if (index > 0 && index < lines.length - 1) {
      let key = '';
      let value = line.substr(1).trim();
      switch (line.charAt(0)) {
        case '*':
          key = 'wordClass';
          wordClass = wordClass.concat(getWordClasses(value));
          value = wordClass;
          break;
        case '-':
          key = 'meaning';
          break;
        case '=':
          key = 'description';
          break;
      }
      if (!vocabulary[key]) vocabulary[key] = [];
      if (key === 'wordClass')
        vocabulary[key] = [...new Set(vocabulary[key].concat(value))];
      else vocabulary[key].push(value);
    }
  });
  return { vocabulary, wordClass };
}
function convertDictToJson(rawData, callback) {
  let paragraphs = rawData.split('\n@');
  let totalCount = paragraphs.length - 1;
  //let totalCount = 100;
  let vocabularies = [];
  let wordClasses = [];
  paragraphs.forEach((paragraph, index) => {
    if (index > 0 && index < totalCount) {
      let { vocabulary, wordClass } = convertParagrapToJson(paragraph);
      vocabularies.push(vocabulary);
      wordClasses = wordClasses.concat(wordClass);
      //log(wordClasses);
      //wordClasses = [...new Set(wordClasses)];
    }
  });
  callback(vocabularies, wordClasses);
}
/**
 *
 */
async function reportWordClassEnglish() {
  var wordClasses = JSON.parse(
    await readFile('./data/wordclasses_original_english.json')
  );
  let report = _.countBy(wordClasses);
  log(report);
}
export { reportWordClassEnglish, convertDictToJson };
