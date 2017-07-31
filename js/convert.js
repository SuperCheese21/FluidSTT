const Fs = require('fs');

var writeOutput = function(name, json, text) {
    Fs.writeFile('output/json/' + name + '.json', json, (e) => {
        if (e) console.log(e.message);
    });
    Fs.writeFile('output/txt/' + name + '.txt', text, (e) => {
        if (e) console.log(e.message);
    });
}

var convertJSON = function(file, json) {
    var content = JSON.parse(json);
    var text = '';

    for (var i = 0; i < content.results.length; i++) {
        text += content.results[i].alternatives[0].transcript;
    }
    writeOutput(file, json, text);
}

module.exports = {
    writeOutput: writeOutput,
    convertJSON: convertJSON
}
