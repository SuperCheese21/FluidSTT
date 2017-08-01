const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const Fs = require('fs');
const Auth = require('./auth.js');
const Request = require('./request.js');

var files = Fs.readdirSync('audio/');
var speechToText;

Auth.getCredentials((credentials) => {
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

    // TODO: Add multi-format compatibility
    if (file.indexOf('.flac') !== -1) {
        console.log(' Requesting transcript for ' + file + '...');
        Request.request(file, speechToText, () => {
            getTranscript(++i);
        });
    } else {
        console.log(' Not a .flac file. Skipping...');
        getTranscript(++i);
    }
}
