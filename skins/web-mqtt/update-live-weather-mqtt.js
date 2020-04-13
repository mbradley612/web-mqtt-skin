/*
* Look at http://simple2kx.com/use-jquery-ajax-and-json-format-to-update-multiple-fields-on-webpage/
*
* Thanks to Thanks to http://www.steves-internet-guide.com/using-javascript-mqtt-client-websockets/
*/


/*
* This script connects to an MQTT server to read a 
*/





/** 
 * Given "0-360" returns the nearest cardinal direction "N/NE/E/SE/S/SW/W/NW"  
 */
function getCardinal(angle) {
	/** 
	 * Customize by changing the number of directions you have
	 * We have 8
	 */
	const degreePerDirection = 360 / 8;
  
	/** 
	 * Offset the angle by half of the degrees per direction
	 * Example: in 4 direction system North (320-45) becomes (0-90)
	 */
	const offsetAngle = angle + degreePerDirection / 2;
  
	return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "N"
	  : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "NE"
		: (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "E"
		  : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "SE"
			: (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "S"
			  : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "SW"
				: (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "W"
				  : "NW";
  }

function updateLoopWeather(loopData) {
	jsonLoopData = JSON.parse(loopData);

	jQuery("#windSpeed").text(Math.round(jsonLoopData.windSpeed_kph));
	jQuery("#mobWindSpeed").text(Math.round(jsonLoopData.windSpeed_kph));

	jQuery("#windGust").text(Math.round(jsonLoopData.windGust_kph));
	jQuery("#mobWindGust").text(Math.round(jsonLoopData.windGustkph));

	jQuery("#windDir").text(getCardinal(jsonLoopData.windDir));
	jQuery("#mobWindDir").text(getCardinal(jsonLoopData.windDir));


	//jQuery("#outTemp").text(json.outTemp.value);
	//jQuery("#mobOutTemp").text(json.outTemp.value);


	observationMoment = moment(jsonLoopData.datetime)
	jQuery("#timestamp").text(observationMoment.format('DD/MM/YY HH:mm:ss'));


	// Davies Vantage Pro does not produce pressure data on its loop feed

	//jQuery("#pressure").text(jsonLoopData.pressure.value);
	//jQuery("#mobPressure").text(jsonLoopData.pressure.value);

}



function MQTTConnect(url, loopTopic, archiveTopic) {
	console.log("connecting to "+ url);

	client = mqtt.connect(url);

	client.subscribe(loopTopic)	;
	

	client.on('connect', () => {
		console.log('Connect success')
	})

	client.on('message', function (topic, message) {


		if (topic == loopTopic) {
			updateLoopWeather(message);
		}

	})

	client.on('reconnect', (error) => {
		console.log('reconnecting:', error)
	})

	client.on('error', (error) => {
		console.log('Connect Error:', error)
	})
}
