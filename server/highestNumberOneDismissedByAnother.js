const fs = require('fs');

let deliveriesData = JSON.parse(fs.readFileSync('./data/deliveries.json', 'utf8'))

function highestNumberOneDismissedByAnother( deliveriesData) {

    let result = deliveriesData.reduce((acc, curr) => {

        if (curr.dismissal_kind != "run out" && curr.player_dismissed != "") {

            if (!acc[curr.batsman]) {
                acc[curr.batsman] = {}
            }

            if (!acc[curr.batsman][curr.bowler]) {
                acc[curr.batsman][curr.bowler] = 1
            }else{
            acc[curr.batsman][curr.bowler] += 1
            }
        }
        return acc
    }, {})

    let max = -1
    let maxBowler = ''
    let maxBatsman
    let finalObj = {}
    for (let batsman in result) {
        for (let bowler in result[batsman]) {
            if (result[batsman][bowler] > max) {
                max = result[batsman][bowler]
                maxBowler = bowler
                maxBatsman = batsman
            }
        }
    }
    finalObj[maxBatsman] = { [maxBowler]: max }

    return finalObj
}

let output = highestNumberOneDismissedByAnother( deliveriesData)
console.log(output)

fs.writeFileSync('./public/output/highestNumberOneDismissedByAnother.json', JSON.stringify(output, null, 2), 'utf8');