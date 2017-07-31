const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const Fs = require('fs');
const Request = require('./request.js')

var i = 0;
var files = Fs.readdirSync('audio/');

var speechToText = new SpeechToTextV1 ({
    username: '62ab9399-13af-48c8-9a48-96b8506fcae1',
    password: 'iXH0UsqFJsuy'
});

var getTranscript = function(file) {
    console.log('file: ' + file);

    if (file.indexOf('.flac') !== -1) {
        console.log(' Requesting transcript for ' + file + '...');
        Request.request(file, speechToText, () => {
            getTranscript(files[i++]);
        });
    } else {
        console.log(' Not a .flac file. Skipping...');
        getTranscript(files[i++]);
    }
}

getTranscript(files[i]);
