const fs = require('fs');

let deliveriesData = JSON.parse(fs.readFileSync('./data/deliveries.json', 'utf8'))

function bowlerBestEconomyInSuperOver(deliveriesData){

    let result = {}

    for(let delivery of deliveriesData){
        if(delivery.is_super_over != 0){
            if(!result[delivery.bowler]){
                result[delivery.bowler] =  {runs:0,balls:0}
            }

            result[delivery.bowler].runs += Number(delivery.noball_runs) + Number(delivery.wide_runs) + Number(delivery.batsman_runs)

            if(delivery.wide_runs == 0 && delivery.noball_runs == 0){
                result[delivery.bowler].balls += 1 
            }
        }
    }
   
 let economyObj = {}
    for(let bowlers in result ){
             let runs  = Number(result[bowlers].runs)
             let balls = Number(result[bowlers].balls)

        economyObj[bowlers] = (runs / balls)*6
    }


    let bestEconomy = {}
    let minValue = Infinity
    let bestBowler = ''
    for(let bowlers in economyObj){
        if(economyObj[bowlers] < minValue){
            minValue = economyObj[bowlers]
            bestBowler = bowlers
        }
    }
    bestEconomy[bestBowler] = minValue
    return bestEconomy
       
}  
    
let output = bowlerBestEconomyInSuperOver(deliveriesData);

console.log(output)

fs.writeFileSync('./public/output/bowlerBestEconomyInSuperOver.json', JSON.stringify(output, null, 2), 'utf8');


