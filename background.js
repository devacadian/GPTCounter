let count = 0;
let startTime = null;
let timer = null;

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (details.method === 'POST' && details.url.includes('https://chat.openai.com/')) {
            count++;
            if (count === 1) {
                startTime = Date.now();
                timer = setInterval(function() {
                    let elapsedTime = Date.now() - startTime;
                    chrome.storage.local.set({'time': Math.max(0, 3*60*60 - Math.floor(elapsedTime / 1000))}, function() {
                        if (elapsedTime >= 3 * 60 * 60 * 1000) {
                            clearInterval(timer);
                            timer = null;
                        }
                    });
                }, 1000);
            }
            chrome.storage.local.set({'count': count});
        }
    },
    {urls: ["<all_urls>"]}
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.reset) {
        count = 0;
        startTime = Date.now();
        chrome.storage.local.set({'count': count, 'time': 3*60*60}, function() {
            if (timer) clearInterval(timer);
            timer = setInterval(function() {
                let elapsedTime = Date.now() - startTime;
                chrome.storage.local.set({'time': Math.max(0, 3*60*60 - Math.floor(elapsedTime / 1000))}, function() {
                    if (elapsedTime >= 3 * 60 * 60 * 1000) {
                        clearInterval(timer);
                        timer = null;
                    }
                });
            }, 1000);
        });
    }
});
