const fs = require('fs');
const IBMWatsonSTT = require('watson-developer-cloud/speech-to-text/v1');
const GoogleCloudSTT = require('@google-cloud/speech');
const argv = require('yargs').argv;

const auth = require('./auth.js');

// Only needed if the Google Cloud Speech API is used
//====================================================
const PROJECT_ID = 'fluidstt'; // Google Cloud project ID
const FILES = [
    '08-PTE_01_44min.flac'
];
//====================================================

var request;    // request module (Google or IBM)
var files;  // list of audio files
var speechToText;   // Speech to text object (Google or IBM)

// checks command line arg
if (argv.s == 'google') {
    request = require('./request_google.js');
    files = FILES;
    speechToText = GoogleCloudSTT({
        projectId: PROJECT_ID
    });
} else if (argv.s == 'ibm') {
    request = require('./request_ibm.js');
    files = fs.readdirSync('audio/');

    // fetches the Watson API credentials from the ibm.config file
    auth.getCredentials((credentials) => {
        speechToText = new IBMWatsonSTT ({
            username: credentials[0],
            password: credentials[1]
        });

        // validates credentials
        speechToText.getModels(null, function(error) {
            if (error) console.log('Error: ' + error.message);

            // initiates the recursive function that requests transcripts if credentials are valid
            else getTranscript(0);
        });
    });
}

// recursive function that requests transcripts for each audio file
var getTranscript = function(i) {
    if (i == files.length) return;
    var file = files[i];
    console.log('File: ' + file);

    // makes request only if file is an audio file
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

// initiates the recursive function that requests transcripts only if requesting from google
if (argv.s == 'google') getTranscript(0);
