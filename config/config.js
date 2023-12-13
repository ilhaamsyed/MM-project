/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 *
 * You can use environment variables using a `config.js.template` file instead of `config.js`
 * which will be converted to `config.js` while starting. For more information
 * see https://docs.magicmirror.builders/configuration/introduction.html#enviromnent-variables
 */
let config = {
	address: "localhost",	// Address to listen on, can be:
							// - "localhost", "127.0.0.1", "::1" to listen on loopback interface
							// - another specific IPv4/6 to listen on a specific interface
							// - "0.0.0.0", "::" to listen on any interface
							// Default, when address config is left out or empty, is "localhost"
	port: 8080,
	basePath: "/",			// The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
					  		// you must set the sub path here. basePath must end with a /
	ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.0.42", "::ffff:192.168.0.50"],	// Set [] to allow all IP addresses
															// or add a specific IPv4 of 192.168.1.5 :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
															// or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
															// ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

	useHttps: false, 		// Support HTTPS or not, default "false" will use HTTP
	httpsPrivateKey: "", 	// HTTPS private key path, only require when useHttps is true
	httpsCertificate: "", 	// HTTPS Certificate path, only require when useHttps is true

	language: "en",
	locale: "en-US",
	logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
	timeFormat: 24,
	units: "metric",

	modules: [
		{
			module: "alert",
		},
		{
			module: "updatenotification",
			position: "top_bar"
		},
		{
			module: "clock",
			position: "center"
		},
		{
			module: "calendar",
			header: "US Holidays",
			position: "top_left",
			config: {
				calendars: [
					{
						fetchInterval: 7 * 24 * 60 * 60 * 1000,
						symbol: "calendar-check",
						url: "https://ics.calendarlabs.com/76/mm3137/US_Holidays.ics"
					}
				]
			}
		},
		{
			module: "weather",
			position: "top_right",
			config: {
				weatherProvider: "openweathermap",
				type: "current",
				location: "Dallas",
				locationID: "4684888", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "0162365fa98797fb1f71b0c136e69933"
			}
		},
		{
			module: "weather",
			position: "top_right",
			header: "Weather Forecast",
			config: {
				weatherProvider: "openweathermap",
				type: "forecast",
				location: "Dallas",
				locationID: "4684888", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
				apiKey: "0162365fa98797fb1f71b0c136e69933"
			}
		},
		{
			module: "newsfeed",
			position: "bottom_bar",
			config: {
				feeds: [
					{
						title: "New York Times",
						url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
					}
				],
				showSourceTitle: true,
				showPublishDate: true,
				broadcastNewsFeeds: true,
				broadcastNewsUpdates: true
			}
		},
		
		{
			module: 'worldclock',
			position: 'top_left', // This can be any of the regions, best results in top_left or top_right regions
			config: {
			// See 'Configuration options' for more information.

				timeFormat: 'hh:mm A', //defined in moment.js format()
				style: 'top', //predefined 4 styles; 'top', 'left','right','bottom'
				offsetTimezone: null, // Or you can set `Europe/Berlin` to get timegap difference from this timezone. `null` will be UTC timegap.
				clocks: [
				  {
					title: "Home",
				  },
				  {
					title: "HOLLYWOOD", // Too long title could cause ugly text align.
					timezone: "America/Los_Angeles", //When omitted, Localtime will be displayed. It might be not your purporse, I bet.
					flag: "us",
				  },
				  {
					timezone: "Asia/Seoul",
				  },
				]
			  }
		},
		{
			module: 'MMM-Year-Progress',
			position: 'bottom_left',
			header: 'Progress',
			config: {
				updateInterval: 60 * 60 * 1000,
				debug: false
			}
		},
		{
		  module: "MMM-MyScoreboard",
		  position: "top_right",
		  classes: "default everyone",
		  header: "My Scoreboard",
		  config: {
			showLeagueSeparators: true,
			colored: true,
			viewStyle: "mediumLogos",
			sports: [
			  {
				league: "NBA",
				teams: ["TOR"],
				groups: ["Pacific", "Central"]
			  },
			  {
				league: "NFL",
				teams: ["WAS", "NYJ", "HOU", "DAL"]
			  },
			]

		  }
		},
		 {
            module: 'MMM-Carousel',
            config: {
                transitionInterval: 10000,
                ignoreModules: ['clock', 'alert'],
                mode: 'slides',
                slides: [
                    ['calendar', 'weather', 'MMM-Year-Progress'],
                    ['weather', 'newsfeed', 'MMM-Year-Progress'],
                    ['worldclock', 'MMM-Year-Progress','MMM-MyScoreboard']
                ],
            }
		},
	]
		
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
