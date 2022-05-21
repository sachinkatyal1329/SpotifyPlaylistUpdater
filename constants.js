const util = require('util');
const spotify = require('spotify-web-api-node');

// const asyncFunction = util.promisify(voidFunction);	

const CLIENT_ID = 'c7ae430167d94164bfec52e755be2f05'
const CLIENT_SECRET = '1c1ad3ef07c14bdd9f89f78e889b0b0d'
const REDIRECT_URI = 'http://localhost:3000/callback'
const USER_ID = 'Superswami1329'

const initSpotifyApi = (access_token) => {
	var spotifyApi = new spotify({
	  clientId: CLIENT_ID,
	  clientSecret: CLIENT_SECRET,
	  redirectUri: 'http://www.example.com/callback'
	});


	spotifyApi.setAccessToken(access_token);

	return spotifyApi	
}

module.exports = {
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URI,
	USER_ID,
	initSpotifyApi
}