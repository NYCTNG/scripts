// ==UserScript==
// @name           FetLife BCC
// @namespace      https://fetlife.com/conversations/*
// @description    FetLife BCC
// @include        https://fetlife.com/conversations/*
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


function sendToAll()
{
	YUD = unsafeWindow.YAHOO.util.Dom;
	YUC = unsafeWindow.YAHOO.util.Connect;
	var sb = YUD.get('submit_button');
	sb.innerHTML = "Sending...<br/>";

	idField = YUD.get("bcc").value;
	ids = idField.split(",");


	YUD.get("")
	var og1 = YUD.get("subject").parentNode.parentNode.parentNode;
	var og2 = YUD.getFirstChild(og1);
	var og3 = YUD.getLastChild(og2);
	toOriginal = og3.innerHTML;

	ids.push(toOriginal);

	var handleSuccess = function(o)
	{
		//alert(o.tId);
		var data = o.responseText;

		var regexN = /you sure you spelled their nickname right/;
		var theMatchN = data.match(regexN);
		if(theMatchN)
		{
			YUD.get("rec_"+o.tId).innerHTML = "&nbsp;&nbsp;[NOT FOUND]";
		}
		else
		{

			var regex = /fetlife\.com\/users\/\d+\/pictures/;
			var theMatch = data.match(regex).toString();
			var id = theMatch.replace(/[^0-9]/gi, "");
			if(id)
			{
				YUD.get("rec_"+o.tId).innerHTML = "&nbsp;&nbsp;[ID FOUND: "+id+"]";
				sendTheMessage(id,o.tId);
			}
			else
			{
				YUD.get("rec_"+o.tId).innerHTML = "&nbsp;&nbsp;[ID NOT FOUND]";
			}
		}

	}
	var handleFailure = function(o)
	{
		alert("Connection Failed.");
	}
	var count = 0;
	for(var i in ids)
	{
		var sendToId = ids[i].replace(/ /gi, "");
		var callback = {
			success: handleSuccess,
			failure: handleFailure,
			scope: unsafeWindow
		};
		var sUrl = "https://fetlife.com/"+sendToId;
		if(sendToId != "")
		{
			sb.innerHTML += sendToId +"... <span id='rec_"+count+"'></span><br/>";
			var request = YUC.asyncRequest('GET', sUrl, callback);
			count++;
		}
	}

}

function init(){
	
	YUD = unsafeWindow.YAHOO.util.Dom;
	var teste = YUD.get("subject").parentNode.parentNode.parentNode;

	var newRow = document.createElement('tr');

	var newTh = "<label for='bcc'>BCC:<br/>(Comma<br/>Seperated)</label>";
	var newTd = "<textarea id='bcc' class='text expand' style='width: 500px; height: 100px;'></textarea>";

	YUD.insertAfter(newRow,YUD.getFirstChild(teste));
	//YUD.insertAfter(newTh,YUD.getLastChild(newRow));
	newRow.innerHTML = "<th>"+newTh+"</th><td>"+newTd+"</td>";

	var sb = YUD.get('submit_button');
	sb.innerHTML = "<a id='sta' onclick='sendToAll();' href='javascript: void(0);'>Send To All</a>";
	unsafeWindow.sendToAll = sendToAll;
	YUD.get('sta').style.backgroundColor = "red";
	//YUD.get.('sta').onclick = "alert('test')";
	//YUD.get('sta').onclick = sendToAll;

}

function loadYUI(){
	if(typeof unsafeWindow.YAHOO=="undefined"||!unsafeWindow.YAHOO)
	{
		window.setTimeout(loadYUI,3000);
	}
	else
	{
		init();
	}
}

loadYUI();


function sendTheMessage(sendToId, internalId)
{
	YUD = unsafeWindow.YAHOO.util.Dom;
	YUC = unsafeWindow.YAHOO.util.Connect;

	subject = YUD.get("subject").value;
	body = YUD.get("body").value;
	authenticityToken = YUD.get("authenticity_token").innerHTML;



	var handleSuccessS = function(o)
	{
        var sTest = strpos(o.responseText,"Your message has been successfully sent",0);

        if(sTest)
        {
            YUD.get("rec_"+internalId).innerHTML = "&nbsp;&nbsp;[SENT ("+ sTest +"): "+sendToId+"]";
        }
        else
        {
            YUD.get("rec_"+internalId).innerHTML = "&nbsp;&nbsp;[UNVERIFIED and/or FAILED: "+sendToId+"]";
        }
	}

	var handleFailureS = function(o)
	{
		YUD.get("rec_"+internalId).innerHTML = "&nbsp;&nbsp;[SEND FAILED: "+internalId+"]";
	}

	var sUrl = "https://fetlife.com/conversations";

	var postValue = "";

      postValue += "utf8=%E2%9C%93";
      postValue += "&authenticity_token=" + urlencode(authenticityToken);
      postValue += "&with=" + urlencode(sendToId);
      postValue += "&subject=" + urlencode(subject);
      postValue += "&=" + urlencode(body);
      postValue += "&body=" + urlencode(body);
      postValue += "&commit=Start+Conversation";
	var callback = {
		success: handleSuccessS,
		failure: handleFailureS,
		scope: unsafeWindow
	};
	var request = YUC.asyncRequest('POST', sUrl, callback, postValue);


}





