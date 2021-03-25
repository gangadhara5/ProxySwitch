var isDisabled;

function enableProxy() {
       var config = {
        mode: "system",
      };
	  chrome.proxy.settings.set(
          {value: config},
          function() {});
		  isDisabled = false;
	chrome.browserAction.setIcon({path:"toggle-on-48.png"});
}

function disableProxy() {
	var config = {
	mode: "direct",
  };
  chrome.proxy.settings.set(
	  {value: config},
	  function() {});
	isDisabled = true;
	chrome.browserAction.setIcon({path:"toggle-off-48.png"});
}

function saveStatus() {
	 chrome.storage.local.set({"state": isDisabled}, function(){});
}
chrome.browserAction.onClicked.addListener(function(tab) 
    { 
		chrome.storage.local.get({"state":false}, function(obj) {
		isDisabled = obj.state; 
		if(isDisabled) {
			enableProxy();
		} else {
		   disableProxy();
		}
		saveStatus();
		});
    });
		
document.addEventListener('DOMContentLoaded', function() 
	{
		chrome.storage.local.get({"state":false}, function(obj) {
				isDisabled = obj.state; 
				if(isDisabled) {
				  disableProxy();
				} else {
				  enableProxy();
				}
			});
	});

