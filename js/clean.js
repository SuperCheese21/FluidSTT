const Fs = require('fs');

var directories = [
    'output/json/',
    'output/txt/'
];

for (var i = 0; i < directories.length; i++) {
    var files = Fs.readdirSync(directories[i]);

    for (var j in files) {
        Fs.unlink(directories[i] + files[j], (e) => {
            if (e) {
                console.log(e.message);
            } else {
                console.log("Removed " + files[j]);
            }
        });
    }
}
