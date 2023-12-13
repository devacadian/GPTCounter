let timestamps = [];
let timer = null;

function startTimer() {
    timer = setInterval(function() {
        let cutoff = Date.now() - 3*60*60*1000;
        while (timestamps.length > 0 && timestamps[0] < cutoff) {
            timestamps.shift();
        }
        let remainingTime = timestamps.length > 0 ? Math.max(0, 3*60*60 - Math.floor((Date.now() - timestamps[0]) / 1000)) : 3*60*60;
        chrome.storage.local.set({'count': timestamps.length, 'time': remainingTime});
    }, 1000);
}

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (details.method === 'POST' && details.url.includes('https://chat.openai.com/backend-api/conversation')) {
            timestamps.push(Date.now());
            if (timer === null) {
                startTimer();
            }
            let remainingTime = Math.max(0, 3*60*60 - Math.floor((Date.now() - timestamps[0]) / 1000));
            chrome.storage.local.set({'count': timestamps.length, 'time': remainingTime});
        }
    },
{urls: ["*://chat.openai.com/*"]}
);

