
const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

function csvToJson(filePath, outputFile) {
    return csv()
        .fromFile(filePath)
        .then((data) => {
            // Convert JSON data to a string with proper formatting
            const jsonData = JSON.stringify(data, null, 2);

            // Write to output file
            fs.writeFileSync(outputFile,JSON.stringify(data, null, 2), 'utf8');

            return jsonData; // Returning data if needed
        })
}
const inputCsv = path.join(__dirname, '../data/matches.csv');
const outputJson = path.join(__dirname, '../data/matches.json');

csvToJson(inputCsv, outputJson);