const fs = require('fs');

var include = ['output/json/', 'output/txt/'];
var exclude = ['.placeholder', '.DS_Store'];

for (var i = 0; i < include.length; i++) {

    var files = fs.readdirSync(include[i]);

    for (var j = 0; j < files.length; j++) {
        var file = files[j];
        var del = true;

        for (var k = 0; k < exclude.length; k++) {
            if (file == exclude[k]) {
                del = false;
            }
        }

        if (del) {
            fs.unlink(include[i] + file, error => {
                if (error) console.log('Error: ' + error.message);
                else console.log('Removed ' + file);
            })
        }
    }
}
