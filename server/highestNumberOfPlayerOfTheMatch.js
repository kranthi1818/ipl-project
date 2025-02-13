const fs = require('fs');

let matchesData = JSON.parse(fs.readFileSync('./data/matches.json', 'utf8'));

function highestNumberOfPlayerOfTheMatch(matchesData) {

    let eachYear = matchesData.reduce((acc, curr) => {

        if (!acc[curr.season]) {
            acc[curr.season] = {}
        }
        let year = curr.season
        let player = curr.player_of_match

        if (!acc[year][player]) {
            acc[year][player] = 1
        }else{
        acc[year][player] += 1
        }
        return acc

    }, {})

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
    return highestPlayer
}

 let output = highestNumberOfPlayerOfTheMatch(matchesData)
 console.log(output)

 fs.writeFileSync('./public/output/highestNumberOfPlayerOfTheMatch.json', JSON.stringify(output, null, 2), 'utf8');
