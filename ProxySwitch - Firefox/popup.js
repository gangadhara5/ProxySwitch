var isDisabled;

function enableProxy() {
       var config = {
        proxyType: "system",
      };
	  browser.proxy.settings.set(
          {value: config},
          function() {});
		  isDisabled = false;
	browser.browserAction.setIcon({path:"toggle-on-48.png"});
}

function disableProxy() {
	var config = {
		proxyType: "none",
  };
  browser.proxy.settings.set(
	  {value: config},
	  function() {});
	isDisabled = true;
	browser.browserAction.setIcon({path:"toggle-off-48.png"});
}

function saveStatus() {
	 browser.storage.local.set({"state": isDisabled}, function(){});
}
browser.browserAction.onClicked.addListener(function(tab) 
    { 
		browser.storage.local.get({"state":false}, function(obj) {
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
		browser.storage.local.get({"state":false}, function(obj) {
				isDisabled = obj.state; 
				if(isDisabled) {
				  disableProxy();
				} else {
				  enableProxy();
				}
			});
	});

