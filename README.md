# FluidSTT

### About

FluidSTT is a simple tool that generates transcripts for audio files, with the ability to batch process multiple files at once.

FluidSTT uses both the Google Cloud Speech API and the IBM Watson Speech-To-Text API

### Installation

1. Install [Node.js](https://nodejs.org/en/download/) and [NPM](https://www.npmjs.com/get-npm)
2. Clone this repository
    ```
    git clone https://github.com/SuperCheese21/FluidSTT.git
    ```
3. Install all required modules
    ```
    npm install
    ```

### Usage

If you are using IBM:
- Place your audio files into the provided **audio/** directory.
- Open the **ibm.config** file and place your own API credentials inside. This step is necessary for this program to work.
- ```npm run ibm``` to request transcripts using IBM Watson Speech-To-Text

If you are using Google Cloud:
- Upload your files to Google Cloud Storage
- Open **main.js** and fill in the Project ID and list of audio files
- Open **request_google.js** and fill in the Bucket ID
- ```npm run google``` to request transcripts using Google Cloud Speech-To-Text

For each audio file, a .json file and a .txt file will be generated inside the **output/** directory.

To clean out the output directory:
    ```
    npm run clean
    ```

###### Copyright (c) 2017 Ethan Shields. All Rights Reserved
