import _ from 'lodash';
import { readFile, log } from './utils.js';
async function reportWordClassEnglish() {
  var wordClasses = JSON.parse(
    await readFile('./data/wordclasses_original_english.json')
  );
  let report = _.countBy(wordClasses);
  log(report);
}
async function reportDuplicateWord() {
  var words = JSON.parse(await readFile('./data/vocabularies_final.json'));
  const counts = _.countBy(words, 'word');

  // Find all elements with a count greater than 1
  const duplicates = Object.keys(counts).filter((key) => counts[key] > 1);

  console.log(duplicates.length); // Output: ['1', '3']
  console.log(duplicates); // Output: ['1', '3']
}

reportDuplicateWord();
/**
 * Note 
 * ! vài từ bị nên coi lại
 */
export { reportWordClassEnglish, reportDuplicateWord };
