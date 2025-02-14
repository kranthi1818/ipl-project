const fs = require('fs');

let matchesData = JSON.parse(fs.readFileSync('./data/matches.json', 'utf8'));

function wonTossAndMatch(matchesData){
          
          let result ={}
          for(let match of matchesData){
            if(!result[match.toss_winner]){
                result[match.toss_winner] = 0
            }
            if(match.toss_winner == match.winner){
              result[match.toss_winner] += 1 

            }
          }
          return result
}
 let output =   wonTossAndMatch(matchesData)
 console.log(output)
 fs.writeFileSync('./public/output/wonTossAndMatch.json', JSON.stringify(output, null, 2), 'utf8');
 