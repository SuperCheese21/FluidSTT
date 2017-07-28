const fs = require('fs');

var Convert = {
    convertJSON: (file) => {
        fs.readFile('output/json/' + file, (e, d) => {
            if (e) {
                throw e;
            }
            var content = JSON.parse(d);
            writeTxt(file, content);
        });
    },

    writeTxt: (file, content) => {
        var text = "";
        var outputFile = file.split('.json')[0] + '.txt';

        for (var i in content.results.length) {
            text += content.results[i].alternatives[0].transcript;
        }
        fs.writeFile('output/txt/' + outputFile, text, (e) => {
            if (e) {
                console.log(e.message);
            }
            console.log(outputFile);
        });
    }
}

module.exports = Convert;
