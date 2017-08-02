const Fs = require('fs');
const Convert = require('./convert.js');

var request = function(file, speechToText, callback) {
    var fileType = file.split('.')[file.split('.').length - 1];
    var fileName = file.split('.' + fileType)[0];
    var params = {
        'audio': Fs.createReadStream('audio/' + file),
        'content_type': 'audio/' + fileType,
        'smart_formatting': true
    };
    speechToText.recognize(params, (error, transcript) => {
        if (error) {
            console.log(' Error: ', error.message);
        } else {
            var content = JSON.stringify(transcript, null, '\t');
            Convert.convertJSON(fileName, content);
            console.log(' Done');
        }
        callback();
    });
}

module.exports = {
    request: request
}
