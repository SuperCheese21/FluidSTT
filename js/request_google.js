const convert = require('./convert.js');
const G_CLOUD_BUCKET = ''; // Google Cloud bucket ID

var request = function(file, speech, callback) {
    var fileType = file.split('.')[file.split('.').length - 1];
    var fileName = file.split('.' + fileType)[0];

    var req = {
        config: {
            encoding: file.indexOf('.flac') !== -1 ? 'FLAC' : 'LINEAR16',
            languageCode: 'en-US'
        },
        audio: {
            uri: 'gs://' + G_CLOUD_BUCKET + '/' + file
        }
    };

    speech.longRunningRecognize(req)
        .then((results) => {
            const operation = results[0];
            return operation.promise();
        })
        .then((results) => {
            var content = JSON.stringify(results, null, '\t');
            convert.convertJSON(fileName, content);
            console.log(' Done');
            callback();
        })
        .catch((err) => {
            console.error(' ERROR:', err);
        });

}

module.exports = {
    request: request
}
