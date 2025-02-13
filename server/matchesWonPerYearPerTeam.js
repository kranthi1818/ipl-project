const fs = require('fs');

const rawData = fs.readFileSync('./data/matches.json', 'utf8');
const matches = JSON.parse(rawData);

function matchesWonPerYearPerTeam(matches) {
    const result = matches.reduce((acc, curr) => {

        if (curr && typeof curr == 'object' && typeof curr.season != 'undefined' && typeof curr.winner != 'undefined') {

            const winner = curr.winner.trim();
            if (winner != '')
                if (!acc[curr.season]) {
                    acc[curr.season] = {}
                } 
                
                if (acc[curr.season][curr.winner]) {
                    acc[curr.season][curr.winner] += 1
                } else {
                    acc[curr.season][curr.winner] = 1
                }
        }
        return acc
    }, {})
    return result
}

let output = matchesWonPerYearPerTeam(matches)
console.log(output)

fs.writeFileSync('./public/output/matchesWonPerYearPerTeam.json', JSON.stringify(output, null, 2), 'utf8');


