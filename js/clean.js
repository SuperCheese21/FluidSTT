const fs = require('fs');

// Directories to clean
var include = ['output/json/', 'output/txt/'];

// specific files to ignore
var exclude = ['.placeholder', '.DS_Store'];

// loops through each directory
for (var i = 0; i < include.length; i++) {

    // read files in directory
    var files = fs.readdirSync(include[i]);

    // loops through files in current directory
    for (var j = 0; j < files.length; j++) {
        var file = files[j];
        var del = true;

        // checks to see if current file is excluded
        for (var k = 0; k < exclude.length; k++) {
            if (file == exclude[k]) {
                del = false;
            }
        }

        // deletes file if current file is not excluded
        if (del) {
            fs.unlink(include[i] + file, error => {
                if (error) console.log('Error: ' + error.message);
                else console.log('Removed ' + file);
            })
        }
    }
}
