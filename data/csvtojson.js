// const csv = require('csvtojson')

// function csvToJson(filePath) {
//     return csv()
//         .fromFile(filePath)
//         .then((data) => {
//             return data;

//         })
// }



const fs = require('fs')

function csvTojson(path,filenametosave){
    try {
        const csvFile  = fs.readFileSync(path)

        const arr = csvFile.toString().split('\n').filter( (row) => row.trim() )
        
        
        let jsonObject = []
        let headers = arr[0].split(',').map(header => header.trim());
        
        
        
        for(let row=1;row<arr.length;row++){
            let data = arr[row].split(',').map(dat => dat.trim());
            let object = {}
        
            for(let column = 0;column<data.length;column++){
                object[headers[column]] = data[column];
            }
            jsonObject.push(object)
        }
        
        // console.log(JSON.stringify(jsonObject,null,2))
        
         fs.writeFileSync(filenametosave,JSON.stringify(jsonObject,null,2))
         
    } catch (error) {
        console.log(error)
    }
}
// fs.writeFileSync('./data/matches.json', JSON.stringify(jsonObject, null, 2), 'utf8');
csvTojson('./data/matches.csv','./data/matches.json')
csvTojson('./data/deliveries.csv','./data/deliveries.json')