$(document).ready(function() {
	// wait for asana to load everything
	$(document).on("DOMNodeInserted",function(evt){
		if( $(evt.target).attr('id') == "tab-ring-dispatcher" ){
			// add send to tab/panel link
			var windowType = '';
			chrome.runtime.sendMessage({ greeting: 'getType' }, function(response) {
				windowType = response.farewell;

				// add options link
				var sendLink = '';
				if (windowType == 'normal') {
					sendLink += '<div class="new-button new-default-button extra-bar-button"><span class="left-button-icon"></span><span class="new-button-text"><a class="asana_ext_sendto" href="#" data-type="panel">Send to Panel</a></span><span class="right-button-icon"></span></div>';
				} else {
					sendLink += '<div class="new-button new-default-button extra-bar-button"><span class="left-button-icon"></span><span class="new-button-text"><a class="asana_ext_sendto" href="#" data-type="normal">Send to Tab</a></span><span class="right-button-icon"></span></div>';
				}
				$('#help-bar').prepend(sendLink);
			});

			// send to tab/panel click
			$('#help-bar').on('click', '.asana_ext_sendto', function() {
				var url = location.href;
				var type = $(this).attr('data-type');
				chrome.runtime.sendMessage({ greeting: 'create', url: url, type: type }, function(response) {
				});
			});
		}
	});
});
