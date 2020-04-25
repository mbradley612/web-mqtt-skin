/*
* Look at http://simple2kx.com/use-jquery-ajax-and-json-format-to-update-multiple-fields-on-webpage/
*
* Thanks to Thanks to http://www.steves-internet-guide.com/using-javascript-mqtt-client-websockets/
*/


/** 
  * Given "0-360" returns the nearest cardinal direction "N/NNE/NE/ENE/E/ESE/SE/SSE/S/SSW/SW/WSW/W/WNW/NW/NNW"  
 */
function getCardinal(angle) {
	/** 
	 * Customize by changing the number of directions you have
	 * We have 8
	 */
	const degreePerDirection = 360 / 16;
  
	/** 
	 * Offset the angle by half of the degrees per direction
	 * Example: in 4 direction system North (320-45) becomes (0-90)
	 */
	const offsetAngle = angle + degreePerDirection / 2;
  
	return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "N"
	  : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "NNE"
		: (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "NE"
		  : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "ENE"
			: (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "E"
			  : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "ESE"
				: (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "SE"
				  : (offsetAngle >= 7 * degreePerDirection && offsetAngle < 8 * degreePerDirection) ? "SSE"
				    : (offsetAngle >= 8 * degreePerDirection && offsetAngle < 9 * degreePerDirection) ? "S"
				      : (offsetAngle >= 9 * degreePerDirection && offsetAngle < 10 * degreePerDirection) ? "SSW"
				        : (offsetAngle >= 10 * degreePerDirection && offsetAngle < 11 * degreePerDirection) ? "SW"
				          : (offsetAngle >= 11 * degreePerDirection && offsetAngle < 12 * degreePerDirection) ? "WSW"
				            : (offsetAngle >= 12 * degreePerDirection && offsetAngle < 13 * degreePerDirection) ? "W"
				              : (offsetAngle >= 13 * degreePerDirection && offsetAngle < 14 * degreePerDirection) ? "WNW"
				                : (offsetAngle >= 14 * degreePerDirection && offsetAngle < 15 * degreePerDirection) ? "NW"
				                  : "NNW";
  }

function updateLoopWeather(loopData) {
	jsonLoopData = JSON.parse(loopData);

	jQuery("#windSpeed").text(Math.round(jsonLoopData.windSpeed_knot));
	jQuery("#mobWindSpeed").text(Math.round(jsonLoopData.windSpeed_knot));

	jQuery("#windGust").text(Math.round(jsonLoopData.windGust_knot));
	jQuery("#mobWindGust").text(Math.round(jsonLoopData.windGust_knot));

	jQuery("#windDir").text(getCardinal(Math.round(jsonLoopData.windDir)));
	jQuery("#mobWindDir").text(getCardinal(Math.round(jsonLoopData.windDir)));


	jQuery("#windDirDegrees").text(Math.round(jsonLoopData.windDir));
	jQuery("#mobWindDirDegrees").text(Math.round(jsonLoopData.windDir));


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
