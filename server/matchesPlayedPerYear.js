const fs = require('fs');

const rawData = fs.readFileSync('./data/matches.json', 'utf8');
const matches = JSON.parse(rawData); 

function matchesPlayedPerYear(matches) {

  let result = {}
  for(let match of matches){
    if (typeof match === 'object' && match.season != "") {

      if(!result[match.season]){
        result[match.season] = 1
      }else{
        result[match.season] += 1
      }
  }
}
  return result
}

let output = matchesPlayedPerYear(matches)
console.log(matchesPlayedPerYear(matches))

fs.writeFileSync('./public/output/matchesPlayedPerYear.json', JSON.stringify(output, null, 2), 'utf8');
