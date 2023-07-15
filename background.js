let timer = null;

function startTimer() {
    let startTime = Date.now();
    timer = setInterval(function() {
        let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        let remainingTime = Math.max(0, 3*60*60 - elapsedTime);
        chrome.storage.local.set({'time': remainingTime}, function() {
            if (remainingTime === 0) {
                clearInterval(timer);
                timer = null;
                chrome.storage.local.set({'count': 0});
            }
        });
    }, 1000);
}

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (details.method === 'POST' && details.url.includes('https://chat.openai.com/')) {
            chrome.storage.local.get(['count'], function(result) {
                let count = result.count || 0;
                count++;
                if (count === 1) {
                    if (timer) clearInterval(timer);
                    startTimer();
                }
                chrome.storage.local.set({'count': count});
            });
        }
    },
    {urls: ["<all_urls>"]}
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.reset) {
        if (timer) clearInterval(timer);
        chrome.storage.local.set({'count': 0, 'time': 3*60*60}, function() {
            startTimer();
        });
    }
});
