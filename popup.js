document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['count', 'time'], function(result) {
        document.getElementById('count').textContent = result.count || '0';
        document.getElementById('time').textContent = formatTime(result.time || 3*60*60);
    });

    document.getElementById('reset').addEventListener('click', function() {
        chrome.storage.local.set({'count': 0, 'time': 3*60*60}, function() {
            document.getElementById('count').textContent = '0';
            document.getElementById('time').textContent = formatTime(3*60*60);
        });
        chrome.runtime.sendMessage({reset: true});
    });

    setInterval(function() {
        chrome.storage.local.get(['time'], function(result) {
            document.getElementById('time').textContent = formatTime(result.time || 0);
        });
    }, 1000);
});

function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    seconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
