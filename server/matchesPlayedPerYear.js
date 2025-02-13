const fs = require('fs');

const rawData = fs.readFileSync('./data/matches.json', 'utf8');
const matches = JSON.parse(rawData); 

function matchesPlayedPerYear(matches) {
  let result = matches.reduce((acc, curr) => {
    if ( curr && typeof curr == 'object' && typeof curr.season != 'undefined'  ) {

      if (!acc[curr.season]) {
        acc[curr.season] = 1
      } else {
        acc[curr.season] += 1
      }
      
    }
    return acc
  }, {})
  return result
}

let result = matchesPlayedPerYear(matches)
console.log(matchesPlayedPerYear(matches))

fs.writeFileSync('./public/output/matchesPlayedPerYear.json', JSON.stringify(result, null, 2), 'utf8');
