const Fs = require('fs');
const Readline = require('readline');

var writeCredentials = function(username, password) {
    Fs.writeFile(
        './credentials.config',
        username + '\n' + password,
        (error) => {
            if (error) console.log(error.message);
        }
    );
}

var readCredentials = function(callback) {
    var username, password;

    var readline = Readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    readline.question('Username: ', (a) => {
        username = a;
        readline.question('Password: ', (b) => {
            password = b;
            readline.close();
        });
    });
    readline.on('close', () => {
        writeCredentials(username, password);
        callback([username, password]);
    });
}

var getCredentials = function(callback) {
    var credentials = [];

    Fs.readFile('./credentials.config', 'utf8', (error, data) => {
        if (error) {
            console.log('Error: ' + error.message);
        } else {
            credentials = data.split('\n');
            if (!credentials[0] || !credentials[1]) {
                readCredentials((input) => {
                    callback(input);
                })
            } else {
                callback(credentials);
            }
        }
    });
}

module.exports = {
    getCredentials: getCredentials
}
