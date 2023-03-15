import fs from 'fs';
const log = console.log;

const writeFile = async function (fileName, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, content, function (err) {
      if (err) reject(err);
      var statusText = 'write file > ' + fileName + ' success';
      log(statusText);
      resolve(true);
    });
  });
};
const readFile = async function (filename) {
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
};
export { readFile, writeFile, log };
