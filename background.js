let timestamps = [];
let timer = null;
let modelName = '';

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
        if (details.method === 'POST' && details.url.includes('https://chat.openai.com/backend-api/conversation') && !modelName.includes('GPT-3.5')) {
            timestamps.push(Date.now());
            if (timer === null) {
                startTimer();
            }
            let remainingTime = Math.max(0, 3*60*60 - Math.floor((Date.now() - timestamps[0]) / 1000));
            chrome.storage.local.set({'count': timestamps.length, 'time': remainingTime});
        }
    },
    {urls: ["<all_urls>"]}
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.reset) {
        timestamps = [];
        chrome.storage.local.set({'count': timestamps.length, 'time': 3*60*60}, function() {
            document.getElementById('count').textContent = '0';
            document.getElementById('time').textContent = '3:00:00';
        });
    }
    if (request.model) {
        modelName = request.model;
    }
});
