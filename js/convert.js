const fs = require('fs');

// writes data to separate files
var writeOutput = function(name, json, text) {

    // writes json data
    fs.writeFile('output/json/' + name + '.json', json, (error) => {
        if (error) console.log(error.message);
    });

    // writes text data
    fs.writeFile('output/txt/' + name + '.txt', text, (error) => {
        if (error) console.log(error.message);
    });

};

// builds the raw transcript from raw json data
var convertJSON = function(file, json) {

    // parse raw json string
    var jsonRaw = JSON.parse(json);

    // Google returns a JSON array while IBM returns a JSON object
    var content = Array.isArray(jsonRaw) ? jsonRaw[0] : jsonRaw;

    // transcript string
    var text = '';

    // adds each chunk of text to transcript string
    for (var i = 0; i < content.results.length; i++) {
        text += content.results[i].alternatives[0].transcript;
    }

    // calls function to write data to files
    writeOutput(file, json, text);

};

module.exports = {
    convertJSON: convertJSON
};
