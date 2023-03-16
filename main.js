import { readFile, writeFile } from './utils.js';
import { convertDictToHashTable, convertDictToJson } from './converter.js';
(async () => {
  try {
    const rawData = await readFile('AnhViet.dict');
    // convertDictToJson(rawData, (vocabularies, wordClasses) => {
    //   writeFile('vocabularies.json', JSON.stringify(vocabularies));
    //   writeFile(
    //     'wordclasses_' + Date.now() + '.json',
    //     JSON.stringify(wordClasses)
    //   );
    // });
    convertDictToHashTable(rawData, (vocabularies => {
         writeFile(
        'vocabularies.hashtable.json',
        JSON.stringify(vocabularies)
      );
    }))
  } catch (err) {
    console.error(err);
  }
})();
