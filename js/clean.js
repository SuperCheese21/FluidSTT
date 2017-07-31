const Fs = require('fs');

var directories = [
    'output/json/',
    'output/txt/'
];

for (var i = 0; i < directories.length; i++) {
    var files = Fs.readdirSync(directories[i]);

    for (var j = 0; j < files.length; j++) {
        var file = files[j];
        Fs.unlink(directories[i] + file, (e) => {
            if (e) {
                console.log(e.message);
            } else {
                console.log('Removed ' + file);
            }
        });
    }
}
