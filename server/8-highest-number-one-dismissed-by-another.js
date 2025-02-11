const fs = require('fs');

let matchesData = JSON.parse(fs.readFileSync('./data/matches.json', 'utf8'));

let deliveriesData = JSON.parse(fs.readFileSync('./data/deliveries.json', 'utf8'))


function highestNumberOneDismissedByAnother(matchesData,deliveriesData){


  let result  = deliveriesData.reduce((acc,curr)=>{

    if(curr.dismissal_kind != "run out" && curr.player_dismissed != ""){

        if(!acc[curr.batsman]){
            acc[curr.batsman] = {}
        }

       if(! acc[curr.batsman][curr.bowler] ){
        acc[curr.batsman][curr.bowler]  = 0
       }
       acc[curr.batsman][curr.bowler]  += 1
    }
    return acc
},{})




let max  =-1
let  maxBowler = ''
let  maxBatsman
let finalObj = {}
for(let batsman in result){
    for(let bowler in result[batsman]){
        if(result[batsman][bowler] > max){
            max = result[batsman][bowler]
            maxBowler = bowler
            maxBatsman = batsman
        }
    }
    
}
finalObj[maxBatsman]  ={[maxBowler]:max}


return finalObj


    // let result  = deliveriesData.reduce((acc,curr)=>{

       
    //     if(curr['dismissal_kind'] !== 'run out' && curr['player_dismissed'] !== ""){

    //         let key = curr.bowler + "-" +curr.player_dismissed
    //       if(!acc[key]){
    //         acc[key] = 0
    //       }
    //       acc[key] +=1
    //     }

    //     return acc
    // },{})

   
    // let sorted = Object.fromEntries( Object.entries(result).sort((a,b)=>b[1]-a[1]))
    
    // // console.log(sorted)
    // return sorted

}

let output =    highestNumberOneDismissedByAnother(matchesData,deliveriesData)
console.log(output)

//  fs.writeFileSync('./public/output/highestNumberOneDismissedByAnother.json', JSON.stringify(output, null, 2), 'utf8');