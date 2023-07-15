
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['count'], function(result) {
        document.getElementById('count').textContent = result.count || '0';
    });
});
