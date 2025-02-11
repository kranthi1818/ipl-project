const fs = require('fs');

let matchesData = JSON.parse(fs.readFileSync('./data/matches.json', 'utf8'));

let deliveriesData = JSON.parse(fs.readFileSync('./data/deliveries.json', 'utf8'))

function wonTossAndMatch(matchesData,deliveriesData){
          let result = matchesData.reduce((acc,curr)=>{

            if(!acc[curr["toss_winner"]]){
                acc[curr["toss_winner"]] = 0
            }
              if(curr['toss_winner'] == curr['winner']){
                acc[curr["toss_winner"]] += 1 
              }
              
              return acc
          },{})
          // console.log(result)
          return result
}
 let output =   wonTossAndMatch(matchesData,deliveriesData)
 console.log(output)
 fs.writeFileSync('./public/output/wonTossAndMatch.json', JSON.stringify(output, null, 2), 'utf8');
 