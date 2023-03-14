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
const fs = require('fs'),
  log = console.log;
async function writeFile(fileName, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, content, function (err) {
      if (err) reject(err);
      var statusdoc = 'write file > ' + fileName + ' success';
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
function convertDocToJson(doc) {
  let lines = doc.split('\n');
  let vocabularies = [];
  let vocabulary = { word: '', pronunciation: '' };
  let firstLine = lines[0].split(' ');
  vocabulary['word'] = firstLine[0];
  vocabulary['pronunciation'] = firstLine[1];
  lines.forEach((line, index) => {
    if (index > 0) {
      //   if (line.charAt(0) === '*') {
      //     if (!vocabulary['wordClass']) vocabulary['wordClass'] = [];
      //     vocabulary.wordClass.push(translateToEnglish(line.substr(2)));
      //   }
      //   if (line.charAt(0) === '-') {
      //     if (!vocabulary['meaning']) vocabulary['meaning'] = [];
      //     vocabulary.meaning.push((line.substr(2)));
      //   }
      //   if (line.charAt(0) === '=') {
      //     if (!vocabulary['description']) vocabulary['description'] = [];
      //     vocabulary.description.push((line.substr(2)));
      //   }
      let key = '';
      let value = line.substr(2).trim();
      switch (line.charAt(0)) {
        case '*':
          key = 'wordClass';
          break;
        case '-':
          key = 'meaning';
          value = translateToEnglish(value);
          break;
        case '=':
          key = 'description';
          break;
      }
      if (!vocabulary[key]) vocabulary[key] = [];
      vocabulary[key].push(value);
    }
    log(vocabulary);
    vocabularies.push(vocabulary);
  });
}
async function main() {
  try {
    const data = await readFile('anhviet.dict');
    let blockWords = data.split('\n@');
    blockWords.forEach((word, index) => {
      if (index > 0 && index < blockWords.length - 1)
        convertDocToJson(blockWords[index]);
    });
  } catch (err) {
    console.error(err);
  }
}
main();
