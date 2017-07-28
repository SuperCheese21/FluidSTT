const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');
const request = require('./request.js');
const convert = require('./convert.js');

var speechToText = new SpeechToTextV1 ({
    username: '62ab9399-13af-48c8-9a48-96b8506fcae1',
    password: 'iXH0UsqFJsuy'
});

var audioFiles = fs.readdirSync('audio/');
for (var i in audioFiles) {
    var file = audioFiles[i];

    if (file.indexOf('.flac') !== -1) {
        var params = {
            audio: fs.createReadStream('audio/' + file),
            content_type: 'audio/flac'
        };
        request.request(file, speechToText, params);
    }
}

var jsonFiles = fs.readdirSync('output/json/');
for (var i in jsonFiles) {
    var file = jsonFiles[i];

    if (file.indexOf('.json') !== -1) {
        console.log(file);
        convert.convertJSON(file);
    }
}
