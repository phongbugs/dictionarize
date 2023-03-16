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
Here is a report after converting dictionary.dict:
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
{ totalCount: 103905}
```
From ```zymotic``` vocabulary hasn't pronounciation 
