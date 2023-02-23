let csvToJson = require("convert-csv-to-json");

let fileInputName = "./assets/data.csv";
let fileOutputName = "./assets/data.json";

csvToJson.generateJsonFileFromCsv(fileInputName, fileOutputName);
