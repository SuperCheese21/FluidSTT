# FluidSTT

### About

FluidSTT is a simple tool that generates transcripts for audio files, with the ability to batch process multiple files at once. 

FluidSTT uses the IBM Watson Speech-To-Text API.

### Installation

1. Install [Node.js](https://nodejs.org/en/download/) and [NPM](https://www.npmjs.com/get-npm)
2. Clone this repository
    ```
    git clone https://github.com/SuperCheese21/FluidSTT.git
    ```
3. Install the Watson Developer Tools
    ```
    npm install watson-developer-cloud
    ```
4. Open the **credentials.config** file and place your own API credentials inside. This step is necessary for this program to work.

### Usage

Place your audio files into the provided **audio/** directory

To get transcripts for your audio files:
    ```
    npm start
    ```

For each audio file, a .json file and a .txt file will be generated inside the **output/** directory.

To clean out the output directory:
    ```
    npm run clean
    ```

###### Copyright (c) 2017 Ethan Shields. All Rights Reserved
