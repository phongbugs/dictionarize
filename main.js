import { readFile, writeFile } from './utils.js';
import { convertDictToJson } from './convert.js';
(async () => {
  try {
    const rawData = await readFile('anhviet.dict');
    convertDictToJson(rawData, (vocabularies, wordClasses) => {
      writeFile('vocabularies.json', JSON.stringify(vocabularies));
      writeFile(
        'wordclasses_' + Date.now() + '.json',
        JSON.stringify(wordClasses)
      );
    });
  } catch (err) {
    console.error(err);
  }
})();
