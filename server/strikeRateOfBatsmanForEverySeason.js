const fs = require('fs');

let matchesData = JSON.parse(fs.readFileSync('../data/matches.json', 'utf8'));

let deliveriesData = JSON.parse(fs.readFileSync('../data/deliveries.json', 'utf8'))

function strikeRateOfBatsmanForEverySeason(matchesData, deliveriesData) {

    let yearIdObj = {}
    for (let matches of matchesData) {
        if (!yearIdObj[matches['season']]) {
            yearIdObj[matches['season']] = [matches.id]
        } else {
            yearIdObj[matches['season']].push(matches.id)
        }
    }
    let batsmen = {}
    for (let deliveries of deliveriesData) {
        if (deliveries.batsman == 'PA Patel') {
            for (let season in yearIdObj) {
                if (yearIdObj[season].includes(deliveries.match_id)) {

                    if (!batsmen[season]) {
                        batsmen[season] = { runs: 0, balls: 0 }
                    }

                    batsmen[season]['runs'] += parseInt(deliveries.batsman_runs)
                    if (deliveries.wide_runs == 0 && deliveries.noball_runs == 0) {
                        batsmen[season]['balls'] += 1
                    }
                }
            }
        }
    }
    let resultStrike = {}
    let res;
    for (let strikeRate in batsmen) {
        let batstrike = batsmen[strikeRate]
        for (let key in batstrike) {
            res = (parseInt(batstrike.runs) / parseInt(batstrike.balls)) * 100
        }
        resultStrike[strikeRate] = { ['Strike Rate']: res.toFixed(2) }
    }
    return resultStrike

}
let output = strikeRateOfBatsmanForEverySeason(matchesData, deliveriesData)
console.log(output);

fs.writeFileSync('../public/output/strikeRateOfBatsmanForEverySeason.json', JSON.stringify(output, null, 2), 'utf8');