chrome.browserAction.onClicked.addListener(goToAsana);

chrome.windows.onRemoved.addListener(function(windowId) {
	if (windowId == ASANA_WINDOW_ID) {
		ASANA_TAB_ID = 0;
		ASANA_WINDOW_ID = 0;
	}
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
	if (tabId == ASANA_TAB_ID) {
		ASANA_TAB_ID = 0;
		ASANA_WINDOW_ID = 0;
	}
});

chrome.windows.onCreated.addListener(function(window) {
	chrome.windows.get(window.id, { populate: true }, function(window) {
		if (window.tabs[0].url.indexOf(ASANA_URL) != -1) {
			if (ASANA_WINDOW_TYPE == 'panel') {
				ASANA_TAB_ID = 0;
			} else {
				ASANA_TAB_ID = window.tabs[0].id;
			}
			ASANA_WINDOW_ID = window.id;
		}
	});
});

chrome.tabs.onCreated.addListener(function(tab) {
	if (tab.url.indexOf(ASANA_URL) != -1) {
		ASANA_TAB_ID = tab.id;
		ASANA_WINDOW_ID = tab.windowId;
	}
});
