import { readFile, writeFile } from './utils.js';

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
  if (partOfSpeeches.indexOf('viết tắt') > -1) wordClasses.push('acronym');
  if (partOfSpeeches.indexOf('tiếp đầu ngữ') > -1) wordClasses.push('prefix');
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
  vocabulary['pronunciation'] =
    firstLine[1] !== undefined ? '/' + firstLine[1] : '';
  lines.forEach((line, index) => {
    if (index > 0 && index <= lines.length - 1) {
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
      if (key !== '') {
        if (!vocabulary[key]) vocabulary[key] = [];
        if (key === 'wordClass')
          vocabulary[key] = [...new Set(vocabulary[key].concat(value))];
        else vocabulary[key].push(value);
      }
    }
  });
  return { vocabulary, wordClass };
}
/**
 *
 * @param {*} paragraph
 * @returns short_meaning
 */
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

function convertParagrapToJson2(paragraph) {
  let lines = paragraph.split('\n');
  let firstLine = lines[0].split(' /');
  let keyWord = firstLine[0];
  let word = {
    wordClass: [],
    pronunciation: firstLine[1] !== undefined ? '/' + firstLine[1] : '',
    topic: [],
    hacknao: '',
    synonym: [],
    antonym: [],
    shortMeaning: '',
    meaning: '',
  };
  let endIndex = lines.length - 1;
  //lines.length > 3 ? lines.length - 1 : lines.length;
  lines.forEach((line, index) => {
    if (index > 0 && index <= endIndex) {
      //console.log(line);
      let firstChar = line.charAt(0);
      switch (firstChar) {
        case '*':
          let strWordClass = getWordClasses(line);
          word.wordClass = [...new Set(word.wordClass.concat(strWordClass))];
          break;
        // others line start with -, =
        default:
          if (word.shortMeaning === '')
            word.shortMeaning = line.substring(1).trim();
          word.meaning += line + '\n';
          break;
      }
      // if (firstChar === '*') {
      //   let strWordClass = getWordClasses(line);
      //   word.wordClass = [...new Set(word.wordClass.concat(strWordClass))];
      // } else {
      //   if (word.shortMeaning === '')
      //     word.shortMeaning = line.substring(1).trim();
      //   word.meaning += line + '\n';
      // }
    }
  });
  //console.log(word);
  return { word, keyWord };
}
function convertDictToHashTable(rawData, callback) {
  let paragraphs = rawData.split('\n@');
  let totalCount = paragraphs.length - 1;
  //let totalCount = 5;
  let vocabularies = {};
  paragraphs.forEach((paragraph, index) => {
    if (index > 0 && index < totalCount) {
      let { word, keyWord } = convertParagrapToJson2(paragraph);
      if (!vocabularies[keyWord]) vocabularies[keyWord] = word;
    }
  });
  console.log(Object.keys(vocabularies).length);
  callback(vocabularies);
}
async function convertDictToHashTableQuick() {
  const vocabularies = JSON.parse(await readFile('./vocabularies.json'));
  let json = {};
  vocabularies.forEach((vocabulary) => {
    let key = vocabulary.word;
    if (!json[vocabulary.word]) {
      json[key] = vocabulary.pronunciation;
    }
  });
  writeFile('./vocabularies.hashtable.quick.json', JSON.stringify(json));
}
//convertDictToHashTableQuick();
export { convertDictToJson, convertDictToHashTable };
