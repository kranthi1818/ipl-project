const fs = require('fs');

let matchesData = JSON.parse(fs.readFileSync('./data/matches.json', 'utf8'));
let deliveriesData = JSON.parse(fs.readFileSync('./data/deliveries.json', 'utf8'))

function extraRunsConcededPerTeamInTheYear2016(matchesData, deliveriesData) {

        let idOf2016 = new Set()
        for(let match of matchesData){
                if(match.season == '2016'){
                        idOf2016.add(match.id)
                }
        }
        let finalResult = {}

        for(let delivery of deliveriesData){
                if(idOf2016.has(delivery.match_id)){
                        if(!finalResult[delivery.bowling_team]){
                                finalResult[delivery.bowling_team] = Number(delivery.extra_runs)
                        }else{
                                finalResult[delivery.bowling_team] += Number(delivery.extra_runs)
                        }
                }
        }
        return finalResult
}
let output = extraRunsConcededPerTeamInTheYear2016(matchesData, deliveriesData)
console.log(output)
fs.writeFileSync('./public/output/extraRunsConcededPerTeamInTheYear2016.json', JSON.stringify(output, null, 2), 'utf8');
