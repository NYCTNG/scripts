// ==UserScript==
// @name        Auto Post to NYC TNG Group
// @namespace   https://fetlife.com/events/*
// @description Auto Post Your Event to the NYC TNG Group
// @include     https://fetlife.com/events/*
// @version     1
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



function init()
{
	var YUD = unsafeWindow.YAHOO.util.Dom;

	var canEdit = YUD.get('report_event_button');
	if(!canEdit)
	{
	var unit = YUD.getElementsByClassName('ad_unit_v2');
	unit[0].innerHTML = "<br/><h2><a onclick='event1();' href='javascript:void(0);'>POST TO NYC TNG GROUP</a></h2>";

	unsafeWindow.event1 = event1;

	var newDiv = document.createElement('div');
	YUD.insertAfter(newDiv,unit[0]);
	YUD.setStyle(newDiv,'height','0px');
	YUD.setStyle(newDiv,'width','0px');
	YUD.setStyle(newDiv,'display','none');
	newDiv.id = "TNGParseDiv";
	}
}


function event1()
{
	
	var YUD = unsafeWindow.YAHOO.util.Dom;
	var YUC = unsafeWindow.YAHOO.util.Connect;


	function handleSuccessS(o)
	{
		var editPage = o.responseText;
		YUD.get('TNGParseDiv').innerHTML = o.responseText;
		var eN = YUD.get('event_name');
		
		var event_name = eN.value;

		var field = document.getElementsByName('event[description]');

		var event_desc = field[0].value;
		
		var event_desc = event_desc + "\n\n" + '**[EVENT PAGE]['+ document.URL +']**';

		var authenticity_token = YUD.get('authenticity_token').innerHTML;

		//alert(event_name + "\n\n" + event_desc + "\n\n" + authenticity_token);
		
		sUrl = 'https://fetlife.com/groups/10776/group_posts';

		YUD.get('TNGParseDiv').innerHTML = "";


	var postValue = "";

      postValue += "utf8=%E2%9C%93";
      postValue += "&authenticity_token=" + urlencode(authenticity_token);
      postValue += "&group_post[title]=" + urlencode(event_name);
      postValue += "&group_post[group_id]=10776";
      postValue += "&group_post[body]=" + urlencode(event_desc);
      postValue += "&commit=Start+a+New+Discussion";


		

		var callbackP = {
			success: handleSuccessP,
			failure: handleFailureS,
			scope: unsafeWindow
		};
		var requestP = YUC.asyncRequest('POST',sUrl,callbackP,postValue);

		



	}
	function handleFailureS(o)
	{
		alert("Failed: "+ o.responseText);

	}


	function handleSuccessP(o)
	{
		//alert("EVENT POSTED");
		var unit = YUD.getElementsByClassName('ad_unit_v2');
		unit[0].innerHTML = "<br/><h2>POSTED!</h2>";
	}


	var callback = {
		success: handleSuccessS,
		failure: handleFailureS,
		scope: unsafeWindow
	};

	var sUrl = document.URL + '/edit';

	if(confirm("Post to NYC TNG Group?"))
	{
		var request = YUC.asyncRequest('GET',sUrl,callback);
	}
	else
	{
		alert("Canceled");
	}








}












