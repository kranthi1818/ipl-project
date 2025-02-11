const fs = require('fs');

let matchesData = JSON.parse(fs.readFileSync('./data/matches.json', 'utf8'));

let deliveriesData = JSON.parse(fs.readFileSync('./data/deliveries.json', 'utf8'))

function bowlerBestEconomyInSuperOver(matchesData,deliveriesData){


    let result = deliveriesData.reduce((acc,curr)=>{

        if(curr.is_super_over != 0 && curr.is_super_over != undefined){

            if(!acc[curr['bowler']]){
                acc[curr['bowler']] = {runs:0,balls:0}
            }

            acc[curr['bowler']]['runs'] += parseInt(curr['noball_runs']) + parseInt(curr['wide_runs']) + parseInt(curr['batsman_runs'])

            if(curr['wide_runs'] == 0 && curr['noball_runs'] == 0){
                acc[curr['bowler']]['balls'] += 1
            }
        }
        return acc
    },{})
    // console.log(result)


    let economy = {}
    for(let key in result){

       let insideOBj =  result[key]

       economy[key] = (insideOBj['runs'] / insideOBj['balls'] ) * 6
       
    }
    let economyBest = Object.fromEntries(Object.entries(economy).sort((a,b)=> a[1]-b[1]).slice(0,1))

    // console.log(economyBest)
    return economyBest
}  
    
let output =   bowlerBestEconomyInSuperOver(matchesData,deliveriesData);

console.log(output)

fs.writeFileSync('./public/output/bowlerBestEconomyInSuperOver.json', JSON.stringify(output, null, 2), 'utf8');