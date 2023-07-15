
let count = 0;
let startTime = Date.now();

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (details.method === 'POST' && details.url.includes('https://chat.openai.com/')) {
            count++;
            chrome.storage.local.set({'count': count});
        }
    },
    {urls: ["<all_urls>"]}
);

setInterval(function() {
    let elapsedTime = Date.now() - startTime;
    if (elapsedTime >= 3 * 60 * 60 * 1000) {
        count = 0;
        startTime = Date.now();
        chrome.storage.local.set({'count': count});
    }
}, 1000);
