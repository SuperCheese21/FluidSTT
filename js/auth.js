const fs = require('fs');
const readline = require('readline');

// saves user inputted API credentials to ibm.config file
var writeCredentials = function(username, password) {
    // writes data to file
    fs.writeFile(
        './ibm.config',
        username + '\n' + password,
        (error) => {
            if (error) console.log(error.message);
        }
    );
};

// prompts user to input API credentials
var readCredentials = function(callback) {
    var username, password;

    // creates readline interface
    var readline = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // prompts for username
    readline.question('Username: ', (a) => {
        username = a;

        // prompts for password
        readline.question('Password: ', (b) => {
            password = b;

            // close readline prompts
            readline.close();
        });
    });

    // runs when readline is closed
    readline.on('close', () => {
        // writes data to file when readline is closed
        writeCredentials(username, password);

        // handles credentials input
        callback([username, password]);
    });

};

// gets API credentials and prompts user input if file is empty
var getCredentials = function(callback) {
    var credentials = [];

    // reads API credentials from ibm.config file
    fs.readFile('./ibm.config', 'utf8', (error, data) => {
        if (error) {
            console.log('Error: ' + error.message);
        } else {
            // credentials should be separated by newline in the file
            credentials = data.split('\n');

            // check if username or password are missing
            if (!credentials[0] || !credentials[1]) {
                // calls function to prompt user input
                readCredentials((input) => {
                    callback(input);
                });
            } else {
                callback(credentials);
            }
        }
    });
};

module.exports = {
    getCredentials: getCredentials
};
