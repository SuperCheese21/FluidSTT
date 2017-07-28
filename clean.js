const fs = require('fs');

var directories = [
    'output/json/',
    'output/txt/'
];

for (var i in directories) {
    var files = fs.readdirSync(directories[i]);

    for (var j in files) {
        fs.unlink(directories[i] + files[j], (e) => {
            if (e) {
                console.log(e.message);
            } else {
                console.log("Removed " + files[j]);
            }
        });
    }
}
