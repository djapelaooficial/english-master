// check_duplicates.js
const fs = require('fs');
const path = 'c:/Users/joerdson.nascimento/Desktop/teste/english-master-v2/public/data/travel_phrases.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const phraseMap = new Map();
for (const cat of data.categories) {
  for (const p of cat.phrases) {
    const key = p.english.trim().toLowerCase();
    if (!phraseMap.has(key)) phraseMap.set(key, []);
    phraseMap.get(key).push(cat.name);
  }
}
const duplicates = [];
for (const [eng, cats] of phraseMap.entries()) {
  if (cats.length > 1) {
    duplicates.push({ english: eng, categories: cats });
  }
}
if (duplicates.length === 0) {
  console.log('No duplicate English phrases across categories.');
} else {
  console.log('Duplicates found:');
  console.log(JSON.stringify(duplicates, null, 2));
}
