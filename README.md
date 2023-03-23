# Dictionarize
Convert dictionary English - Vietnamese from RAW data to database data(myslq, json, array...) and make some reports
Result of converting is a data of the ```noichu``` game on apple and play store in the future.
## Original Dictionary Info
 - Download from [Mega.nz](https://mega.nz/file/lo8xibJZ#wygPtemMWUhQfJbk4WVr0Sg9EE-t4hVvUxFi4-O2bJA) of [daynhauhoc.com](https://daynhauhoc.com/t/xin-file-text-kho-tu-vung-tieng-anh/37916) (comment of Account [**Gió**](https://daynhauhoc.com/u/Gio))
```
- This is the English-Vietnamese dictionary database of the Free Vietnamese Dictionary Project. It contains more than 109.000 entries with definitions and illustrative examples.
- This database was compiled by Ho Ngoc Duc and other members of the Free Vietnamese Dictionary Project (http://www.informatik.uni-leipzig.de/~duc/Dict/)
- About 5.000 technical terms were imported from VACETS Dictionary Project (http://www.saigon.com/~diction/)
- Copyright (C) 1997-2003 The Free Vietnamese Dictionary Project
- Last updated 2004-07-01
- This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation
- This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY
- See the GNU General Public License for more details.

@00-database-short
- FVDP English-Vietnamese dictionary

@00-database-url
- http://www.informatik.uni-leipzig.de/~duc/Dict/
```


## Reports 
In English, there are traditionally eight parts of speech, which are:

- Noun
- Pronoun
- Verb
- Adjective
- Adverb
- Preposition
- Conjunction
- Interjection
- Article
Here is a report after converting dictionary.dict to vocabularies.json (array type):
```js
{
    article: 4,      
    noun: 58516,     
    preposition: 119,
    adverb: 3770,    
    adjective: 23595,
    acronym: 465,
    verb: 12367,
    interjection: 165,
    conjunction: 63,
    pronoun: 73,
    prefix: 3
}
{ pronunciatedWord: 58092, unPronunciatedWord: 50800 }
{ duplicateWords: ["list in duplicatedVocabularies.json"], quantity:4480 }
{ totalCount: 108892}
```
Here is a report after converting dictionary.dict to vocabularies.hashtable.json (key:value type): this result removed duplicated words
```js
{
  article: 4,
  noun: 57486,
  preposition: 118,
  adverb: 3759,
  adjective: 23462,
  acronym: 460,
  verb: 10071,
  interjection: 165,
  conjunction: 62,
  pronoun: 67,
  prefix: 3
}
{
  'Total Words': 103905,
  'Compound Words': 25524,
  'Single Words Without Pronunciation': 30554,
  'Compund Words Without Pronunciation': 15278,
  'Word Without Pronunciation': 45832,
  'Single Words Without Word Class': 8546,
  'Compund Words Without Word Class': 8372,
  'Words Without Word Class': 16918,
  'Single Words With Pronunciation': 47827,
  'Compound Words With Pronunciation': 10246,
  'Single Words With Word Class': 69835,
  'Compound Words With Word Class': 17152,
  'Single Words With WC & PC': 47783,
  'Compound Words With WC & PC': 10233
}
```
## Result
    - Vocabularies.json -> jsonize AnhViet.dict to array json
    - Vocabularies.hashtable.json -> convert array json to hash table full attributes
    - Vocabularies.hashtable.simple.json -> convert array json to hash table one pronuncation attributes
    - 
From ```zymotic``` vocabulary hasn't pronounciation 
