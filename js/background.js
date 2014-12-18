var ASANA_TAB_ID = 0;
var ASANA_WINDOW_ID = 0;
var ASANA_URL = 'https://app.asana.com/';
var ASANA_WINDOW_TYPE = 'normal';

function createAsana() {
	if (ASANA_WINDOW_TYPE === 'normal') {
		chrome.tabs.create({
			url: ASANA_URL,
			active: true
		}, function(tab) {});
	} else {
		chrome.windows.create({
			url: ASANA_URL,
			type: 'panel',
			focused: true,
			width: 400
		}, function(window) {});
	}
}

function goToAsana() {
    if (ASANA_WINDOW_ID > 0) {
        if (ASANA_TAB_ID > 0) {
            chrome.tabs.get(ASANA_TAB_ID, function(tab) {
                if (tab.url.indexOf(ASANA_URL) == -1) {
                    createAsana();
                } else {
                    chrome.windows.get(ASANA_WINDOW_ID, function(window) {
                        chrome.windows.update(ASANA_WINDOW_ID, { focused: true });
                        chrome.tabs.update(ASANA_TAB_ID, { active:true }, function(tab) {});
                    });
                }
            });
        } else {
            chrome.windows.get(ASANA_WINDOW_ID, function(window) {
                chrome.windows.update(ASANA_WINDOW_ID, { focused: true });
            });
        }
	} else {
        createAsana();
	}
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	if (request.greeting == 'create') {
		if (typeof request.type != 'undefined') {
			ASANA_WINDOW_TYPE = request.type;
		}

		if (ASANA_TAB_ID == 0 && ASANA_WINDOW_ID > 0) {
			chrome.windows.remove(ASANA_WINDOW_ID, function() {
			});
		} else {
			chrome.tabs.remove(ASANA_TAB_ID, function() {
			});
		}

		createAsana();
		sendResponse({ farewell: 'close current' });
	}

	if (request.greeting == 'getType') {
		sendResponse({ farewell: ASANA_WINDOW_TYPE });
	}
});
