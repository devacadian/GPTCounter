chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type && message.type === 'updateUI') {
        updateDisplay();
    }
});


document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();

    document.getElementById('reset').addEventListener('click', function() {
        chrome.storage.local.set({'count': 0, 'time': 3*60*60}, function() {
            updateDisplay();
        });
        chrome.runtime.sendMessage({reset: true});
    });

    setInterval(updateDisplay, 1000);
});

function updateDisplay() {
    chrome.storage.local.get(['count', 'time'], function(result) {
        document.getElementById('count').textContent = result.count || '0';
        document.getElementById('time').textContent = formatTime(result.time || 3*60*60);
        document.getElementById('time').style.color = 'white';
        document.getElementById('time').style.fontWeight = '550';
    });
}

function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    seconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
