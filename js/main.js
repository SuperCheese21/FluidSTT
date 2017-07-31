const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const Fs = require('fs');
const Request = require('./request.js')

var files = Fs.readdirSync('audio/');

var speechToText = new SpeechToTextV1 ({
    username: '62ab9399-13af-48c8-9a48-96b8506fcae1',
    password: 'iXH0UsqFJsuy'
});

var getTranscript = function(i) {
    if (i == files.length) return;
    var file = files[i];
    console.log('File: ' + file);

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

getTranscript(0);
