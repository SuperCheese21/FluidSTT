const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const Fs = require('fs');
const Promise = require('promise');
const Request = require('./request.js')
const Convert = require('./convert.js');

var i = 0;
var files = Fs.readdirSync('audio/');
var speechToText = new SpeechToTextV1 ({
    username: '62ab9399-13af-48c8-9a48-96b8506fcae1',
    password: 'iXH0UsqFJsuy'
});

function getTranscript() {
    if (i == files.length) return;

    var file = files[i++];
    console.log('file: ' + file);

    Request.request(file, speechToText, () => {
        getTranscript();
    });
}

getTranscript();
