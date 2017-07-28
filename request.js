const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const fs = require('fs');

var RequestTranscript = {
    request: (file, speechToText, params) => {
        speechToText.recognize(params, (error, transcript) => {
            if (error) {
                console.log('Error: ', error);
            } else {
                var fileName = file.split('.flac')[0] + '.json';
                var contents = JSON.stringify(transcript, null, '\t');

                fs.writeFile('output/json/' + fileName, contents, (e) => {
                    if (e) {
                        console.log(e.message);
                    }
                    console.log(fileName);
                });
            }
        });
    }
}

module.exports = RequestTranscript;
