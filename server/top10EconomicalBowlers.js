const fs = require('fs');

let matchesData = JSON.parse(fs.readFileSync('./data/matches.json', 'utf8'));

let deliveriesData = JSON.parse(fs.readFileSync('./data/deliveries.json', 'utf8'))

function top10EconomicalBowlers(matchesData, deliveriesData) {

let idOf2015 = []
    for(let match of matchesData ){
        if(match.season == '2015'){
            idOf2015.push(match.id)
        }
    }

    let bowlerRunsAndBalls = {}
    for(let delivery of deliveriesData){
        if(idOf2015.includes(delivery.match_id)){
            if(!bowlerRunsAndBalls[delivery.bowler]){
                bowlerRunsAndBalls[delivery.bowler] = {runs:0,balls:0}
            }

            bowlerRunsAndBalls[delivery.bowler].runs += Number(delivery.wide_runs) || Number(delivery.noball_runs) || Number(delivery.batsman_runs)

            if(delivery.wide_runs == 0 && delivery.noball_runs == 0){
                bowlerRunsAndBalls[delivery.bowler].balls +=1
            }
        }
    }
    
  let economy = {}

  for(let key in bowlerRunsAndBalls){
    let runs  = bowlerRunsAndBalls[key].runs
    let balls  = bowlerRunsAndBalls[key].balls

    economy[key] = (( parseInt(runs) / parseInt(balls)) * 6).toFixed(2)
  }

  let finalResult = Object.fromEntries( Object.entries(economy).sort((a,b)=> a[1]-b[1]).slice(0,10))


return finalResult

}
let output = top10EconomicalBowlers(matchesData, deliveriesData)
console.log(output)
fs.writeFileSync('./public/output/top10EconomicalBowlers.json', JSON.stringify(output, null, 2), 'utf8');

