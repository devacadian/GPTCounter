# ChatGPT Prompt Counter Chrome Extension

This Chrome extension provides a prompt counter and timer for OpenAI's ChatGPT-4 model. Download it from the chrome store [here](https://chrome.google.com/webstore/detail/chatgpt-prompt-counter/djmjoepmfiooddjlmnagnnanhbjpdjkp). It's especially useful for users who need to track the number of prompts sent to the model and the remaining time for the current session.

## Features

- Counts the number of prompts sent to the ChatGPT-4 model
- Displays the remaining time for the current 3-hour session
- Allows resetting the count and timer
- Displays data in an easy-to-access popup

![alt text](https://i.imgur.com/iAoXfJk.png)

## How It Works

The extension listens for HTTP POST requests sent to OpenAI's ChatGPT backend API. Each prompt sent to the model is counted and the time is tracked. The data is updated every second and is displayed in a popup that can be accessed by clicking the extension icon in the Chrome toolbar.

## Installation

1. **Download From the Chrome Store:** Download the chrome extension from the published chrome store listing [here](https://chrome.google.com/webstore/detail/chatgpt-prompt-counter/djmjoepmfiooddjlmnagnnanhbjpdjkp).

OR

1. Clone or download this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions`.
3. Enable Developer mode by ticking the checkbox in the upper-right corner.
4. Click on the "Load unpacked" button and select the directory where you cloned or downloaded the repository.
5. The extension should now be visible in your Chrome toolbar. Click on it to view the count and timer, and to access the reset button.

## Contributing

Contributions are welcome. Please open an issue to discuss your ideas or submit a pull request.
