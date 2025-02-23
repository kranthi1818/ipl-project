const fs = require('fs');

let matchesData = JSON.parse(fs.readFileSync('./data/matches.json', 'utf8'));
let deliveriesData = JSON.parse(fs.readFileSync('./data/deliveries.json', 'utf8'))

function extraRunsConcededPerTeamInTheYear2016(matchesData, deliveriesData) {

        let idOf2016 = matchesData.reduce((idArray, matches) => {
                if (matches["season"] == '2016') {
                        idArray.add((matches.id))
                }
                return idArray
        }, new Set())

        let result = deliveriesData.reduce((extraRuns, deliveries) => {

                if (idOf2016.has(deliveries["match_id"])) {

                        extraRuns[deliveries.bowling_team] = (extraRuns[deliveries.bowling_team] ?? 0) + Number(deliveries.extra_runs)
                }
                return extraRuns
        }, {})
        return result
}

let output = extraRunsConcededPerTeamInTheYear2016(matchesData, deliveriesData)
console.log(output)
fs.writeFileSync('./public/output/extraRunsConcededPerTeamInTheYear2016.json', JSON.stringify(output, null, 2), 'utf8');
