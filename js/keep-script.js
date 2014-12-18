$(document).ready(function() {

	// build overlay and options dialog
	var dialogs = '';

	$.ajax({
		url: chrome.extension.getURL('/html/dialogs.html'),
		success: function(data, xhr, status) {
			$('body').append(data);

			$('.modal-dialog-title-close, .modal-dialog-buttons button.goog-buttonset-action').click(function() {
				$('.glass').addClass('hide');
				$(this).closest('.modal-dialog').addClass('hide');
			});
			$('.modal-dialog-buttons button.donate').click(function() {
				window.open('http://bit.ly/paneldonate');
			});
		}
	});

	// add send to tab/panel link
	var windowType = '';
	chrome.runtime.sendMessage({ greeting: 'getType' }, function(response) {
		windowType = response.farewell;

		// add options link
		var sendLink = '';
		if (windowType == 'normal') {
			sendLink += '<div class="new-button new-default-button extra-bar-button"><span class="left-button-icon"></span><span class="new-button-text"><a class="hSRGPd keep_ext_sendto panelexpand" href="#" data-type="panel">Send to Panel</a></span><span class="right-button-icon"></span></div>';
		} else {
			sendLink += '<div class="new-button new-default-button extra-bar-button"><span class="left-button-icon"></span><span class="new-button-text"><a class="hSRGPd keep_ext_sendto panecollapse" href="#" data-type="normal">Send to Tab</a></span><span class="right-button-icon"></span></div>';
		}
        sendLink += '<a class="hSRGPd keep_ext_about" href="http://bit.ly/paneldonate" target="_blank">Buy me a coffee :)</a>';

		$('#help-bar').prepend(sendLink);
	});

	// send to tab/panel click
	$('div.hSRGPd-haAclf').on('click', '.keep_ext_sendto', function() {
		var url = location.href;
		var type = $(this).attr('data-type');

		chrome.runtime.sendMessage({ greeting: 'create', url: url, type: type }, function(response) {
		});
	});
});
