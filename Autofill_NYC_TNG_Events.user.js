// ==UserScript==
// @name        Autofill NYC TNG Events
// @namespace   https://fetlife.com/events/new
// @description Autofill Standard NYC TNG Events
// @include     https://fetlife.com/events/new
// @version     1
// @grant 		none
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
		window.setTimeout(loadYUI,2000);
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
	var form = YUD.getElementsByClassName('span-7');
	form[0].innerHTML = "<br/><a onclick='event1();' href='javascript:void(0);'>Populate General Munch</a><br/>";
	form[0].innerHTML += "<br/><a onclick='event2();' href='javascript:void(0);'>Populate GOML Party</a><br/>";	
	form[0].innerHTML += "<br/><a onclick='event3();' href='javascript:void(0);'>Populate TES Party</a><br/>";
	form[0].innerHTML += "<br/><a onclick='event4();' href='javascript:void(0);'>Populate Suspension</a><br/>";

	unsafeWindow.event1 = event1;
	unsafeWindow.event2 = event2;
	unsafeWindow.event3 = event3;
	unsafeWindow.event4 = event4;


}

function getMeeting(offset)
{
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth();
	var date = new Date(year, month, 1, 0, 0, 0, 0);
	date.setDate(offset - date.getDay());

	if(d > date)
	{
		month = month + 1;
	}

	var date = new Date(year, month, 1, 0, 0, 0, 0);
	date.setDate(offset - date.getDay());

	return date;
}




function event1()
{
	var YUD = unsafeWindow.YAHOO.util.Dom;

	var date = getMeeting(7);

	var dateString = date.toLocaleDateString();

	YUD.get('event_name').value = "NYC TNG Meeting:  "+ dateString +" @ 5:00PM (General Munch @ Cornerstone Cafe)";
	YUD.get('event_tagline').value = "NYC TNG:  We are the next generation!";
	var field = document.getElementsByName('event[description]');

field[0].value = 'Are you new to the scene? Do you hate going to parties alone? Do you ever just want to hang out with people your own age that share your interests? If you answered "yes" to any of the above, then we invite you to join the NYC TNG 18-35 group for the above meeting.'+"\n\n"+'We will gather at Cornerstone Cafe from 5:00PM to 7:00PM, located at 17 Avenue B, New York, NY (between E. 2nd and E. 3rd Sts.). No dress code required. Just show up, get something to eat, and talk about whatever is on your mind.'+"\n\n"+'**Please be aware, this event has age and dress restrictions:**'+"\n"+'Munch: 18-35 (and partners 18+), Vanilla Setting Appropriate';

YUD.get('event_cost').value = "Cost of Food";

YUD.get('event_dress_code').value = "Vanilla Setting Appropriate";

YUD.get('event_location').value = "Cornerstone Cafe";

YUD.get('event_address').value = "17 Avenue B, New York, NY (between E. 2nd and E. 3rd Sts.)";

YUD.get('event_start_date_time_1i').value = date.getYear();
YUD.get('event_end_date_time_1i').value = date.getYear();

YUD.get('event_start_date_time_2i').value = date.getMonth() + 1;
YUD.get('event_end_date_time_2i').value = date.getMonth() + 1;

YUD.get('event_start_date_time_3i').value = date.getDate();
YUD.get('event_end_date_time_3i').value = date.getDate();

YUD.get('event_start_date_time_4i').value = 17;
YUD.get('event_end_date_time_4i').value = 19;

YUD.get('event_start_date_time_5i').value = "00";
YUD.get('event_end_date_time_5i').value = "00";

YUD.get('event_country_id').value = 233;

var event = document.createEvent("UIEvents");
event.initUIEvent("change", true, true, window, 1);
YUD.get('event_country_id').dispatchEvent(event);

window.setTimeout("var field1 = document.getElementsByName('event[administrative_area_id]'); field1[0].value = 3969; var event = document.createEvent('UIEvents'); event.initUIEvent('change', true, true, window, 1); field1[0].dispatchEvent(event);",2000);

window.setTimeout("var field2 = document.getElementsByName('event[city_id]'); field2[0].value = 11529;",4000);





}

function event2()
{
	var YUD = unsafeWindow.YAHOO.util.Dom;

	var date = getMeeting(13);

	var dateString = date.toLocaleDateString();

	YUD.get('event_name').value = "NYC TNG Meeting/Party Night:  "+ dateString +" (NYC TNG Presents: Get Off My Lawn!; an exclusive party for NYC TNG members and their guests)";
	YUD.get('event_tagline').value = "NYC TNG:  We are the next generation!";
	var field = document.getElementsByName('event[description]');

field[0].value = 'Are you new to the scene? Do you hate going to parties alone? Do you ever just want to hang out with people your own age that share your interests? If you answered "yes" to any of the above, then we invite you to join the NYC TNG 18-35 group for the above meeting.'+"\n\n"+'We will gather in the back of the Skylight Diner from 8:00PM to 9:30PM, located at 402 W 34th St, New York, NY (at 9th Ave). The group will meet in the usual manner; eat, talk, waste time, etc. After the meeting the group will proceed to Paddles, a NYC BDSM club, for an exclusive NYC TNG only play party. Paddles is located at 250 West 26th Street (between 7th and 8th Ave.). Only card carrying members and their guests of any age (over 18) may attend. Admission to the party will be $17.00.'+"\n\n"+'**Please remember to bring your NYC TNG card to show at the door:**'+"\n"+'New membership cards, replacement cards, and renewals can be obtained at the munch prior to the party. Membership is free and open to individuals ages 18-35.'+"\n\n"+'**Please be aware, this event has age, membership, and dress restrictions:**'+"\n"+'Munch: 18-35 (and partners 18+), Vanilla Setting Appropriate'+"\n"+'Party: 18+, NYC TNG Members & Guests Only, Dress To Impress'+"\n\n"+'*As a reminder, NYC TNG does not profit on any party we host. 100% of the revenue collected goes straight to the venue.*';

YUD.get('event_cost').value = "Munch: Cost of Food; Party: $17";

YUD.get('event_dress_code').value = "Munch: Vanilla Setting Appropriate; Party: Dress to Impress";

YUD.get('event_location').value = "Munch: Skylight Diner (8:00PM - 9:30PM); Party: Paddles (9:30PM - 3:00AM)";

YUD.get('event_address').value = "Munch: 402 W 34th St, New York, NY (at 9th Ave); Party: 250 West 26th Street (between 7th and 8th Ave)";

YUD.get('event_start_date_time_1i').value = date.getYear();
YUD.get('event_end_date_time_1i').value = date.getYear();

YUD.get('event_start_date_time_2i').value = date.getMonth() + 1;
YUD.get('event_end_date_time_2i').value = date.getMonth() + 1;

YUD.get('event_start_date_time_3i').value = date.getDate();
YUD.get('event_end_date_time_3i').value = date.getDate() + 1;

YUD.get('event_start_date_time_4i').value = 20;
YUD.get('event_end_date_time_4i').value = "03";

YUD.get('event_start_date_time_5i').value = "00";
YUD.get('event_end_date_time_5i').value = "00";

YUD.get('event_country_id').value = 233;

var event = document.createEvent("UIEvents");
event.initUIEvent("change", true, true, window, 1);
YUD.get('event_country_id').dispatchEvent(event);

window.setTimeout("var field1 = document.getElementsByName('event[administrative_area_id]'); field1[0].value = 3969; var event = document.createEvent('UIEvents'); event.initUIEvent('change', true, true, window, 1); field1[0].dispatchEvent(event);",2000);

window.setTimeout("var field2 = document.getElementsByName('event[city_id]'); field2[0].value = 11529;",4000);

}

function event3()
{
	var YUD = unsafeWindow.YAHOO.util.Dom;

	var date = getMeeting(21);

	var dateString = date.toLocaleDateString();

	YUD.get('event_name').value = "NYC TNG Meeting/Party Night:  "+ dateString +" (TES Party/Paddles)";
	YUD.get('event_tagline').value = "NYC TNG:  We are the next generation!";
	var field = document.getElementsByName('event[description]');

field[0].value = 'Are you new to the scene? Do you hate going to parties alone? Do you ever just want to hang out with people your own age that share your interests? If you answered "yes" to any of the above, then we invite you to join the NYC TNG 18-35 group for the above meeting.'+"\n\n"+'We will gather at the TES Novice Excursion, organized by TES. We will meet in the back of the Skylight Diner from 9:00PM to 10:30PM, located on the corner of 34th and 9th Ave. The group will meet in the usual manner; eat, talk, waste time, etc. After the meeting the group will proceed to Paddles, a NYC BDSM club, located at 250 West 26th Street (between 7th and 8th Ave.). Admission to the party will be $25.00 with your TNG card or $20.00 with your TES card. This event is organized and operated by the TES Novice Group and is not restricted to TNG members only.';

YUD.get('event_cost').value = "Munch: Cost of Food; Party: $25/$20";

YUD.get('event_dress_code').value = "Munch: Vanilla Setting Appropriate; Party: None";

YUD.get('event_location').value = "Munch: Skylight Diner (9:00PM - 10:30PM); Party: Paddles (10:00PM - 3:00AM)";

YUD.get('event_address').value = "Munch: 402 W 34th St, New York, NY (at 9th Ave); Party: 250 West 26th Street (between 7th and 8th Ave)";

YUD.get('event_start_date_time_1i').value = date.getYear();
YUD.get('event_end_date_time_1i').value = date.getYear();

YUD.get('event_start_date_time_2i').value = date.getMonth() + 1;
YUD.get('event_end_date_time_2i').value = date.getMonth() + 1;

YUD.get('event_start_date_time_3i').value = date.getDate();
YUD.get('event_end_date_time_3i').value = date.getDate() + 1;

YUD.get('event_start_date_time_4i').value = 21;
YUD.get('event_end_date_time_4i').value = "03";

YUD.get('event_start_date_time_5i').value = "00";
YUD.get('event_end_date_time_5i').value = "00";

YUD.get('event_country_id').value = 233;

var event = document.createEvent("UIEvents");
event.initUIEvent("change", true, true, window, 1);
YUD.get('event_country_id').dispatchEvent(event);

window.setTimeout("var field1 = document.getElementsByName('event[administrative_area_id]'); field1[0].value = 3969; var event = document.createEvent('UIEvents'); event.initUIEvent('change', true, true, window, 1); field1[0].dispatchEvent(event);",2000);

window.setTimeout("var field2 = document.getElementsByName('event[city_id]'); field2[0].value = 11529;",4000);

}

function event4()
{
	var YUD = unsafeWindow.YAHOO.util.Dom;

	var date = getMeeting(29);

	var dateString = date.toLocaleDateString();

	YUD.get('event_name').value = "NYC TNG Meeting/Party Night:  "+ dateString +" (Suspension)";
	YUD.get('event_tagline').value = "NYC TNG:  We are the next generation!";
	var field = document.getElementsByName('event[description]');

field[0].value = 'Are you new to the scene? Do you hate going to parties alone? Do you ever just want to hang out with people your own age that share your interests? If you answered "yes" to any of the above, then we invite you to join the NYC TNG 18-35 group for the above meeting.'+"\n\n"+'We will gather at Cornerstone Cafe from 8:00PM to 9:30PM, located at 17 Avenue B, New York, NY (between E 2nd and E 3rd Sts.). After the meeting the group will proceed to SUSPENSION, a party in NYC at The Delancey, located at 168 Delancey St (between Clinton & Attorney St.). Admission to the party will be $15.00 for all those wearing fetish or business attire, and $30.00 for those wearing all black. For more information, visit [NYC Fetish Tribe][https://fetlife.com/groups/2650].'+"\n\n"+'**Please be aware, this event has age and dress restrictions:**'+"\n"+'Munch: 18-35, Vanilla Setting Appropriate'+"\n"+'Party: 21+, $15 for Fetish/Business Attire, $30 All Black, No street clothes permitted.'+"\n\n"+'**Caution: Alcohol will be served at the party.**'+"\n"+'Please use your own discretion and judgment when engaging in BDSM activities, especially when drinking. If you encounter any problems, please see a TNG moderator or DM at the party.';

YUD.get('event_cost').value = "Munch: Cost of Food. Party: $15/$30";

YUD.get('event_dress_code').value = "Munch: Vanilla Setting Appropriate. Party: $15 for all those wearing fetish or business attire, $30 for those wearing all black.";

YUD.get('event_location').value = "Munch: Cornerstone Cafe (8:00PM - 9:30PM); Party: The Delancey (9:30PM - 3:00AM)";

YUD.get('event_address').value = "Munch: 17 Avenue B, New York, NY (between E 2nd and E 3rd Sts.); Party: 168 Delancey St (between Clinton & Attorney St.)";

YUD.get('event_start_date_time_1i').value = date.getYear();
YUD.get('event_end_date_time_1i').value = date.getYear();

YUD.get('event_start_date_time_2i').value = date.getMonth() + 1;
YUD.get('event_end_date_time_2i').value = date.getMonth() + 1;

YUD.get('event_start_date_time_3i').value = date.getDate();
YUD.get('event_end_date_time_3i').value = date.getDate() + 1;

YUD.get('event_start_date_time_4i').value = 20;
YUD.get('event_end_date_time_4i').value = "03";

YUD.get('event_start_date_time_5i').value = "00";
YUD.get('event_end_date_time_5i').value = "00";

YUD.get('event_country_id').value = 233;

var event = document.createEvent("UIEvents");
event.initUIEvent("change", true, true, window, 1);
YUD.get('event_country_id').dispatchEvent(event);

window.setTimeout("var field1 = document.getElementsByName('event[administrative_area_id]'); field1[0].value = 3969; var event = document.createEvent('UIEvents'); event.initUIEvent('change', true, true, window, 1); field1[0].dispatchEvent(event);",2000);

window.setTimeout("var field2 = document.getElementsByName('event[city_id]'); field2[0].value = 11529;",4000);

}




