const convert = require('./convert.js');
const G_CLOUD_BUCKET = 'welo_audio_test'; // Google Cloud bucket ID
const LANG_CODE = 'en-US';

// requests transcript using the Google Cloud Speech API
var request = function(file, speech, callback) {

    // splits file into name and extension
    var fileType = file.split('.')[file.split('.').length - 1];
    var fileName = file.split('.' + fileType)[0];

    var req = {
        // config options
        config: {
            encoding: 'FLAC',
            languageCode: LANG_CODE
        },

        // video uri
        // VIDEO MUST BE ON GOOGLE CLOUD STORAGE IN .FLAC FORMAT
        audio: {
            uri: 'gs://' + G_CLOUD_BUCKET + '/' + file
        }
    };

    // Detects speech in the audio file using async recognize
    speech.longRunningRecognize(req)
        .then((results) => {
            const operation = results[0];

            // Get a Promise representation of the final result of the job
            return operation.promise();
        })
        .then((results) => {
            // No need to require js-beautify because JSON.stringify can do it for you
            var content = JSON.stringify(results, null, '\t');

            // Parses raw json content and writes it to files
            convert.convertJSON(fileName, content);

            console.log(' Done');

            // runs callback function that calls getTranscript again
            callback();
        })
        .catch((err) => {
            console.error(' ERROR:', err);
        });

}

module.exports = {
    request: request
}
