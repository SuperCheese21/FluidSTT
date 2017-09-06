const fs = require('fs');

var writeOutput = function(name, json, text) {
    fs.writeFile('output/json/' + name + '.json', json, (error) => {
        if (error) console.log(error.message);
    });
    fs.writeFile('output/txt/' + name + '.txt', text, (error) => {
        if (error) console.log(error.message);
    });
};

var convertJSON = function(file, json) {
    var jsonRaw = JSON.parse(json);
    var content = Array.isArray(jsonRaw) ? jsonRaw[0] : jsonRaw;
    var text = '';

    for (var i = 0; i < content.results.length; i++) {
        text += content.results[i].alternatives[0].transcript;
    }
    writeOutput(file, json, text);
};

module.exports = {
    convertJSON: convertJSON
};
