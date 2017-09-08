const fs = require('fs');
const convert = require('./convert.js');

// requests transcript using the IBM Watson STT API
var request = function(file, speech, callback) {

    // splits file into name and extension
    var fileType = file.split('.')[file.split('.').length - 1];
    var fileName = file.split('.' + fileType)[0];

    // request params
    var params = {
        // input should be a read stream for an audio file
        'audio': fs.createReadStream('audio/' + file),

        // content type should be either audio/flac or audio/mp3
        'content_type': 'audio/' + fileType,

        // automatically formats dates, times, numbers, etc.
        'smart_formatting': true
    };

    // detects speech in the audio file
    speech.recognize(params, (error, transcript) => {
        if (error) {
            console.log(' ' + error.message);
        } else {
            // No need to require js-beautify because JSON.stringify can do it for you
            var content = JSON.stringify(transcript, null, '\t');

            // Parses raw json content and writes it to files
            convert.convertJSON(fileName, content);
            console.log(' Done');
        }

        // runs callback function that calls getTranscript again
        callback();
    });

};

module.exports = {
    request: request
};
