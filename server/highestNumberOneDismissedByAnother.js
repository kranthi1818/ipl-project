const fs = require('fs');

let deliveriesData = JSON.parse(fs.readFileSync('./data/deliveries.json', 'utf8'))

function highestNumberOneDismissedByAnother( deliveriesData) {

    let result = {}

    for(let delivery of deliveriesData){
        if(delivery.dismissal_kind != 'run out' && delivery.player_dismissed){
            if(!result[delivery.batsman]){
                result[delivery.batsman] = {}
            }

            if(!result[delivery.batsman][delivery.bowler]){
                result[delivery.batsman][delivery.bowler] = 1
            }else{
                result[delivery.batsman][delivery.bowler] += 1
            }
        }
    }
    
    let maxBatter = ''
    let maxBowler=''
    let maxValue = -1
    let finalResult ={}

    for(let  batter in result){
        for(let bowler in result[batter]){
            if(result[batter][bowler] > maxValue){
                maxValue = result[batter][bowler]
                maxBatter = batter
                maxBowler = bowler
            }
        }
    }
    finalResult[maxBatter] = {[maxBowler]:maxValue}
    return finalResult

}

let output = highestNumberOneDismissedByAnother( deliveriesData)
console.log(output)

fs.writeFileSync('./public/output/highestNumberOneDismissedByAnother.json', JSON.stringify(output, null, 2), 'utf8');