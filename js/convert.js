const fs = require('fs');

var writeOutput = function(name, json, text) {
    fs.writeFile('output/json/' + name + '.json', json, (error) => {
        if (error) console.log(e.message);
    });
    fs.writeFile('output/txt/' + name + '.txt', text, (error) => {
        if (error) console.log(e.message);
    });
};

var convertJSON = function(file, json) {
    var content = JSON.parse(json);
    var text = '';

    for (var i = 0; i < content.results.length; i++) {
        text += content.results[i].alternatives[0].transcript;
    }
    writeOutput(file, json, text);
};

module.exports = {
    convertJSON: convertJSON
};
