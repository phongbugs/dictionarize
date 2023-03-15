/**
a /ei, ə/
*  danh từ,  số nhiều as,  a's
- (thông tục) loại a, hạng nhất, hạng tốt nhất hạng rất tốt
=his health is a+ sức khoẻ anh ta vào loại a
- (âm nhạc) la
=a sharp+ la thăng
=a flat+ la giáng
- người giả định thứ nhất; trường hợp giả định thứ nhất
=from a to z+ từ đầu đến đuôi, tường tận
=not to know a from b+ không biết tí gì cả; một chữ bẻ đôi cũng không biết
*  mạo từ
- một; một (như kiểu); một (nào đó)
=a very cold day+ một ngày rất lạnh
=a dozen+ một tá
=a few+ một ít
=all of a size+ tất cả cùng một cỡ
=a Shakespeare+ một (văn hào như kiểu) Sếch-xpia
=a Mr Nam+ một ông Nam (nào đó)
- cái, con, chiếc, cuốn, người, đứa...;
=a cup+ cái chén
=a knife+ con dao
=a son of the Party+ người con của Đảng
=a Vietnamese grammar+ cuốn ngữ pháp Việt Nam
*  giới từ
- mỗi, mỗi một
=twice a week+ mỗi tuần hai lần

- decrypt 
Line 0[0] : vocabulary
Line 0[1] : pronunciation
Line[*] : wordclass
Line[-] : meaning
Line[=] : description Line[=].split('+ ')[0]: english meaning 
 */
import _ from 'lodash';
import fs from 'fs';
const log = console.log;
async function writeFile(fileName, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, content, function (err) {
      if (err) reject(err);
      var statusText = 'write file > ' + fileName + ' success';
      log(statusText);
      resolve(true);
    });
  });
}
function readFile(filename) {
  return new Promise(function (resolve, reject) {
    const readStream = fs.createReadStream(filename, 'utf8');
    let data = '';

    readStream.on('data', function (chunk) {
      data += chunk;
    });

    readStream.on('end', function () {
      resolve(data);
    });

    readStream.on('error', function (err) {
      reject(err);
    });
  });
}
function translateToEnglish(wordClass) {
  switch (wordClass.toLowerCase()) {
    case 'mạo từ':
      break;
  }
  return wordClass;
}
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
function covertDictToJson(rawData, callback) {
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
async function reportWordClassEnglish() {
  var wordClasses = JSON.parse(
    await readFile('./wordclasses_1678871748917.json')
  );
  let report = _.countBy(wordClasses);
  log(report);
}
async function main() {
  try {
    const rawData = await readFile('anhviet.dict');
    covertDictToJson(rawData, (vocabularies, wordClasses) => {
      writeFile('vocabularies.json', JSON.stringify(vocabularies));
      //log([new Set(wordClasses)]);
      writeFile(
        'wordclasses_' + Date.now() + '.json',
        JSON.stringify(wordClasses)
      );
    });
  } catch (err) {
    console.error(err);
  }
}

//main();
reportWordClassEnglish();
