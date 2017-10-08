// ==UserScript==
// @name           FetLife Get Friends 2
// @namespace      https://fetlife.com/users/*
// @description    FetLife Get Friends 2
// @include        https://fetlife.com/users/*
// ==/UserScript==

function strpos (haystack, needle, offset) {
  // http://kevin.vanzonneveld.net
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Onno Marsman
  // +   bugfixed by: Daniel Esteban
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: strpos('Kevin van Zonneveld', 'e', 5);
  // *     returns 1: 14
  var i = (haystack + '').indexOf(needle, (offset || 0));
  return i === -1 ? false : i;
}


function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}

function urlencode (str) {
    str = (str+'').toString();
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
          replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
    }


function includeScript(file)
{

  var script  = document.createElement('script');
  script.src  = file;
  script.type = 'text/javascript';
  //script.defer = true;

  document.getElementsByTagName('head').item(0).appendChild(script);

}


includeScript("https://ajax.googleapis.com/ajax/libs/yui/2.8.0r4/build/yahoo-dom-event/yahoo-dom-event.js");
includeScript("https://ajax.googleapis.com/ajax/libs/yui/2.8.0r4/build/connection/connection-min.js");



function getFriends()
{
    var friendIcons = YUD.getElementsByClassName('profile_avatar','img');
    var fText = '';
    for(var i=0; i<friendIcons.length; i++)
    {
        if(friendIcons[i].alt != "undefined")
        {
            if(fText != '')
            {
                fText += "\n";
            }
            fText += friendIcons[i].alt;
        }
    }
    alert(fText);
}




function init(){
	
	YUD = unsafeWindow.YAHOO.util.Dom;
    YUC = unsafeWindow.YAHOO.util.Connect;


    //alert(fText);
    var np = YUD.getElementsByClassName('next_page','a');

    var lp = YUD.getPreviousSibling(np[0]);
    var pagenumbers = YUD.getElementsByClassName('mtl center','div');
    var pagenumbersEle = pagenumbers[0];

    var pages = parseInt(lp.innerHTML, 10);
    
    var newLink = document.createElement('a');
    newLink.href = 'javascript: void(0);';
    newLink.innerHTML = "Get Friends";
    unsafeWindow.getFriends = getFriends;
    YUD.setAttribute(newLink,'onclick','getFriends();');
    YUD.insertBefore(newLink,YUD.get("tabnav"));


    for(var i=2; i<=pages; i++)
    {
        var sUrl = "?page=" + i;
        var handleFailure = function(o)
        {
        }
        var handleSuccess = function(o)
        {
            var pageText = o.responseText; 
            var start = strpos(pageText,'<p class="quiet small mvm">',0);
            var stop = strpos(pageText,'<div class="mtl center">',0);
            var insertText = pageText.slice(start,stop);
            var newSection = document.createElement('div');
            newSection.innerHTML = insertText;
            YUD.insertBefore(newSection,pagenumbersEle);
        }
        var callback = {
            success: handleSuccess,
            failure: handleFailure,
            scope: unsafeWindow
        };
        var request = YUC.asyncRequest('GET', sUrl, callback);
    }


    if(0)//if(np[0])
    {
        var nextPage = np[0].href;
        window.location = nextPage;
    }
}

function loadYUI(){
	if(typeof unsafeWindow.YAHOO=="undefined"||!unsafeWindow.YAHOO)
	{
		window.setTimeout(loadYUI,1000);
	}
	else
	{
		init();
	}
}

loadYUI();



