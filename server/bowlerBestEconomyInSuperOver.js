const fs = require('fs');

let deliveriesData = JSON.parse(fs.readFileSync('./data/deliveries.json', 'utf8'))

function bowlerBestEconomyInSuperOver(deliveriesData){

    let result = deliveriesData.reduce((acc,curr)=>{

        if(curr.is_super_over != 0){

            if(!acc[curr.bowler]){
                acc[curr.bowler] = {runs:0,balls:0}
            }

            acc[curr.bowler].runs += parseInt(curr.noball_runs) + parseInt(curr.wide_runs) + parseInt(curr.batsman_runs)

            if(curr.wide_runs == 0 && curr.noball_runs == 0){
                acc[curr.bowler].balls += 1
            }
        }
        return acc
    },{})

    let economy = {}
    for(let key in result){

       let insideOBj =  result[key]
       economy[key] = (parseInt(insideOBj.runs) / parseInt(insideOBj.balls )) * 6
       
    }

    let economyEntries = Object.entries(economy).sort((a,b)=> a[1]-b[1]) //convertring the object into arrays and sorting from lowest to highest using values

    let bestBowler = economyEntries.slice(0,1) // slice out the best bowler that is first

    let bestBowlerObject = Object.fromEntries(bestBowler) //converting array back into object
   
    return bestBowlerObject
}  
    
let output = bowlerBestEconomyInSuperOver(deliveriesData);

console.log(output)

fs.writeFileSync('./public/output/bowlerBestEconomyInSuperOver.json', JSON.stringify(output, null, 2), 'utf8');


