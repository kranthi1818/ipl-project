const fs = require('fs');

const rawData = fs.readFileSync('./data/matches.json', 'utf8');
const matches = JSON.parse(rawData);

function matchesWonPerYearPerTeam(matches) {
    let result ={}

    for(let match of matches){
        if (match && typeof match == 'object' && typeof match.season != 'undefined' && typeof match.winner != 'undefined') {
            if(!result[match.season]){
                result[match.season] = {}
            }
            if(!result[match.season][match.winner]){
                result[match.season][match.winner] = 1
            }else{
                result[match.season][match.winner] += 1
            } 
    }
}
return result
}

let output = matchesWonPerYearPerTeam(matches)
console.log(output)

fs.writeFileSync('./public/output/matchesWonPerYearPerTeam.json', JSON.stringify(output, null, 2), 'utf8');


