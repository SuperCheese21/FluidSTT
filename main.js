const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const Fs = require('fs');
const Promise = require('promise');
const Convert = require('./convert.js');

var speechToText = new SpeechToTextV1 ({
    username: '62ab9399-13af-48c8-9a48-96b8506fcae1',
    password: 'iXH0UsqFJsuy'
});
var sessionID = "";
var audioFiles = Fs.readdirSync('audio/');

speechToText.createSession({}, function(error, session) {
    if (error)
        console.log('Error:', error);
    else {
        console.log('Session ID: ' + session.session_id);
        sessionID = session.session_id;
    }
});

var file = 'test1.flac';
console.log('file: ' + file + ', i: ' + i);
console.log('Requesting transcript for ' + file + '...');

var params = {
    'session_id': sessionID,
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
    }
});
