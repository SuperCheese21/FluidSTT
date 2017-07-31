const Fs = require('fs');
const Convert = require('./convert.js');

var request = function(file, speechToText, callback) {
    if (file.indexOf('.flac') !== -1) {
        console.log('Requesting transcript for ' + file + '...');

        var params = {
            'audio': Fs.createReadStream('audio/' + file),
            'content_type': 'audio/flac'
        };
        speechToText.recognize(params, (error, transcript) => {
            if (error) {
                console.log('Error: ', error.message);
            } else {
                var fileName = file.split('.flac')[0];
                var content = JSON.stringify(transcript, null, '\t');

                Convert.convertJSON(fileName, content);
                callback();
            }
        });
    } else {
        callback();
    }
}

module.exports = {
    request: request
}
