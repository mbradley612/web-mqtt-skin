/*
* Script to check for the liveweather element. If it exists,
* invoke our MQTTConnect method, which connects using wss
* to the MQTT Mosquitto server, and updates the fields on the page.
*/

// once the page has loaded
jQuery(document).ready(function () {
	
		if ($('#liveweather').length) {
		    MQTTConnect("wss://content2.hillheadsc.org.uk:9443/mqtt","weather/loop","weather/archive")
        }
		
	
});
