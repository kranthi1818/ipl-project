const fs = require('fs');

let matchesData = JSON.parse(fs.readFileSync('./data/matches.json', 'utf8'));

function highestNumberOfPlayerOfTheMatch(matchesData) {


    let result ={}

    for(let match of matchesData){
        if(!result[match.season]){
            result[match.season] ={}
        }
        if(!result[match.season][match.player_of_match]){
            result[match.season][match.player_of_match] = 1
        }else{
            result[match.season][match.player_of_match]  += 1
        }
    }

    let finalResult = {}
    for(let season in result){
        let maxPlayer = ''
        let maxValue = -1
        for(let players in result[season]){
            if(result[season][players] > maxValue){
                maxValue = result[season][players]
                maxPlayer = players
             }
        }
        finalResult[season] = {name :maxPlayer,count:maxValue}
    }
   
 
    return finalResult

}

 let output = highestNumberOfPlayerOfTheMatch(matchesData)
 console.log(output)

 fs.writeFileSync('./public/output/highestNumberOfPlayerOfTheMatch.json', JSON.stringify(output, null, 2), 'utf8');
