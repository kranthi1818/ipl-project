const { match } = require('assert');
const fs = require('fs');

let matchesData = JSON.parse(fs.readFileSync('./data/matches.json', 'utf8'));

let deliveriesData = JSON.parse(fs.readFileSync('./data/deliveries.json', 'utf8'))

function highestNumberOfPlayerOfTheMatch(matchesData, deliveriesData) {

    let eachYear = matchesData.reduce((Acc, CurrOBj) => {

        if (!Acc[CurrOBj['season']]) {
            Acc[CurrOBj['season']] = {}
        }
        let year = CurrOBj['season']
        let player = CurrOBj['player_of_match']
        if (!Acc[year][player]) {
            Acc[year][player] = 0
        }
        Acc[year][player] += 1
        return Acc

    }, {})

    // let playerOfmatch = {}


    //   for(let key in eachYear){
    //      playerOfmatch[key] =  Object.fromEntries(Object.entries(eachYear[key]).sort((a,b)=> b[1]-a[1]).slice(0,1))

    //   }


let highestPlayer = {}

    for (let key in eachYear) {
        let maxPlayer = ''
        let maxValue = -1
      
       for(let player in eachYear[key]){

        if(eachYear[key][player] > maxValue){
            maxValue = eachYear[key][player]
            maxPlayer = player
        }
       }
      highestPlayer[key] = {name:maxPlayer,count:maxValue}  
    }
    // console.log(highestPlayer)
    return highestPlayer
}
 let output = highestNumberOfPlayerOfTheMatch(matchesData, deliveriesData)
 console.log(output)
 fs.writeFileSync('./public/output/highestNumberOfPlayerOfTheMatch.json', JSON.stringify(output, null, 2), 'utf8');
