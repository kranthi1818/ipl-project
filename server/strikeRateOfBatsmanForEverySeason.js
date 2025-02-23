const fs = require('fs');

let matchesData = JSON.parse(fs.readFileSync('./data/matches.json', 'utf8'));

let deliveriesData = JSON.parse(fs.readFileSync('./data/deliveries.json', 'utf8'))

function strikeRateOfBatsmanForEverySeason(matchesData, deliveriesData) {

    let result  = matchesData.reduce((acc,curr)=>{
        if(!acc[curr.season]){
            acc[curr.season] =  new Set()
        }
            acc[curr.season].add(curr.id)
        
        return acc
    },{})
    let batterObj = deliveriesData.reduce((acc,curr)=>{
        if(curr.batsman == 'PA Patel'){
            for(let season in result){
                if(result[season].has(curr.match_id)){
                    if(!acc[season]){
                        acc[season] = {runs:0,balls:0}
                    }

                    acc[season].runs += parseInt(curr.batsman_runs)

                    if(curr.wide_runs == 0 && curr.noball_runs == 0){
                        acc[season].balls += 1
                    }
                }
            }
        }
        return acc
    },{})
   let strikeRate ={}
    let res
   for(let year in batterObj){
    let insideOBj = batterObj[year]
    res = ( parseInt( insideOBj.runs) / parseInt(insideOBj.balls) ) * 100
    strikeRate[year] = {['Strike Rate']:res.toFixed(2)}
   }
   return strikeRate
}
let output = strikeRateOfBatsmanForEverySeason(matchesData, deliveriesData)
console.log(output);

fs.writeFileSync('./public/output/strikeRateOfBatsmanForEverySeason.json', JSON.stringify(output, null, 2), 'utf8');