$(document).ready(function() {
	
	// add send to tab/panel link
	var windowType = '';
	chrome.runtime.sendMessage({ greeting: 'getType' }, function(response) {
		windowType = response.farewell;
		
		// add options link
		var sendLink = '';
		if (windowType == 'normal') {
			sendLink += '<a class="hSRGPd keep_ext_sendto" href="#" data-type="panel"><span class="icon icon-external"></span> Send to Panel</a>';
		} else {
			sendLink += '<a class="hSRGPd keep_ext_sendto" href="#" data-type="normal"><span class="icon icon-external"></span>Send to Tab</a>';
		}
        sendLink += '<a class="hSRGPd keep_ext_collapse" href="#"><span class="icon icon-checkbox"></span> Collapse List View</a>';
        sendLink += '<a class="hSRGPd keep_ext_about" href="http://bit.ly/paneldonate" target="_blank">Support Panel View for Keep</a>';
		
		$('div.hSRGPd-haAclf').prepend(sendLink);
	});
	
    // send to tab/panel click
	$('div.hSRGPd-haAclf').on('click', '.keep_ext_sendto', function() {
		var url = location.href;
		var type = $(this).attr('data-type');
		
		chrome.runtime.sendMessage({ greeting: 'create', url: url, type: type }, function(response) {
		});
	});
    
    // save on click and reset classes
    $('div.hSRGPd-haAclf').on('click', '.keep_ext_collapse', function() {
		var collapseVal = !($('body').hasClass('collapse-list-view'));
        
        chrome.storage.sync.set({ 'collapse': collapseVal }, function() {
            if (collapseVal) {
                $('body').addClass('collapse-list-view');
                $('.keep_ext_collapse .icon-checkbox').addClass('checked');
            } else {
                $('body').removeClass('collapse-list-view');
                $('.keep_ext_collapse .icon-checkbox').removeClass('checked');
            }
        });
	});
    
    // on page load, set the body and checkbox classes
    chrome.storage.sync.get('collapse', function(items) {
        if (items.collapse !== undefined && items.collapse === true) {
            $('body').addClass('collapse-list-view');
            $('.keep_ext_collapse .icon-checkbox').addClass('checked');
        }
    });
});
