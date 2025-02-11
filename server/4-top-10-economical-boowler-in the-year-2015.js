const fs = require('fs');

let matchesData = JSON.parse(fs.readFileSync('./data/matches.json', 'utf8'));

let deliveriesData = JSON.parse(fs.readFileSync('./data/deliveries.json', 'utf8'))


function top10EconomicalBowlers(matchesData, deliveriesData) {

    let idOf2015 = matchesData.filter((items) => items['season'] == '2015')
        .map((items) => items['id']);

    // console.log(idOf2015)

    let bowlerRunsAndBalls = deliveriesData.reduce((runsBalls, deliveries) => {

        if (idOf2015.includes(deliveries['match_id'])) {
            if (!runsBalls[deliveries['bowler']]) {
                runsBalls[deliveries['bowler']] = { runs: 0, balls: 0 }
            }
            // console.log(bowler)
            runsBalls[deliveries['bowler']]['runs'] += Number(deliveries['wide_runs']) || Number(deliveries['noball_runs']) || Number(deliveries['batsman_runs'])

            if (deliveries['wide_runs'] == 0 && deliveries['noball_runs'] == 0) {
                runsBalls[deliveries['bowler']]['balls']++
            }

        }
        return runsBalls

    }, {})


    let economy = {}

    for (let key in bowlerRunsAndBalls) {

        let runs = bowlerRunsAndBalls[key]['runs']
        let balls = bowlerRunsAndBalls[key]['balls']
        economy[key] = (runs / balls) * 6
    }
    let entries = Object.fromEntries(Object.entries(economy).sort((a, b) => a[1] - b[1]).slice(0, 10))
    return entries

}
let output = top10EconomicalBowlers(matchesData, deliveriesData)
console.log(output)
fs.writeFileSync('./public/output/top10EconomicalBowlers.json', JSON.stringify(output, null, 2), 'utf8');