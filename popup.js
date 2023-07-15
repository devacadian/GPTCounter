document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['count'], function(result) {
        document.getElementById('count').textContent = result.count || '0';
    });

    document.getElementById('reset').addEventListener('click', function() {
        chrome.storage.local.set({'count': 0}, function() {
            document.getElementById('count').textContent = '0';
        });
    });
});
