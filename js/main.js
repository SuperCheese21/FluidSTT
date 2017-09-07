const fs = require('fs');
const IBMWatsonSTT = require('watson-developer-cloud/speech-to-text/v1');
const GoogleCloudSTT = require('@google-cloud/speech');
const argv = require('yargs').argv;

const auth = require('./auth.js');

// Only needed if the Google Cloud Speech API is used
//====================================================
const PROJECT_ID = ''; // Google Cloud project ID
const FILES = [
    // File names inside of GCS bucket
];
//====================================================

var request;
var files;
var speechToText;

if (argv.s == 'google') {
    request = require('./request_google.js');
    files = FILES;
    speechToText = GoogleCloudSTT({
        projectId: PROJECT_ID
    });
    getTranscript(0);
} else if (argv.s == 'ibm') {
    request = require('./request_ibm.js');
    files = fs.readdirSync('audio/');
    auth.getCredentials((credentials) => {
        speechToText = new IBMWatsonSTT ({
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
}

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
