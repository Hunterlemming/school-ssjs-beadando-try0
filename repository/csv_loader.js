const csvParser = require("csv-parse");
const fs = require("fs");


const csvData = [];
let nextID = 0;


function init() {

    return new Promise( (resolve, reject) => {

        const parser = csvParser({
            delimiter: ";",
            skip_empty_lines: true
        });

        parser.on("readable", () => {
            let record;
            while (record = parser.read()) {
                record.length = record.length - 1;
                csvData.push(record);
            }
        });

        parser.on("error", (err) => {
            reject(err);
        });

        parser.on("end", () => {
            console.log("R : " + csvData.length);
            console.log("C : " + csvData[0].length);
            resolve();
        });

        fs.createReadStream("data/dtl.csv").pipe(parser);

    });
}

module.exports = {
    getNextRawFrame: () => {
        if (nextID === csvData.length) {
            nextID = 0;
        }
        return (csvData[nextID++]).join(",");
    },
    init
}