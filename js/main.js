const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');
const auth = require('./auth.js');
const request = require('./request.js');

var files = fs.readdirSync('audio/');
var speechToText;

auth.getCredentials((credentials) => {
    speechToText = new SpeechToTextV1 ({
        username: credentials[0],
        password: credentials[1]
    });
    speechToText.getModels(null, function(error) {
        if (error) {
            console.log('Error: ' + error.message);
        } else {
            getTranscript(0);
        }
    });
});

var getTranscript = function(i) {
    if (i == files.length) return;
    var file = files[i];
    console.log('File: ' + file);

    if (file.indexOf('.flac') !== -1 || file.indexOf('.mp3') !== -1) {
        console.log(' requesting transcript for ' + file + '...');
        request.request(file, speechToText, () => {
            getTranscript(++i);
        });
    } else {
        console.log(' Not an audio file. Skipping...');
        getTranscript(++i);
    }
};
