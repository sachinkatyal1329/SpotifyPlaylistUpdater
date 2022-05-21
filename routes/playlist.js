const express = require('express');

const router = express.Router();
const constants = require('../constants');

const spotify = require('spotify-web-api-node');

const request = require('request');

const axios = require('axios');

router.get('/', async (req, res) => {
	const access_token_data = await axios.get('http://localhost:3000/playlist/auth').catch(e => { console.log(e) })
	const access_token = access_token_data.data
	const spotifyApi = constants.initSpotifyApi()
	spotifyApi.setAccessToken(access_token);



	spotifyApi.getUserPlaylists(constants.USER_ID)
		.then(function(data) {
			// let playlists = res.json(data.body.items)

			playlists = data.body.items
			
			
			const offset = 20
			const numIter = Math.ceil(data.body.total / offset)

			for (let i = 0; i < numIter; i++) {
				const temp = spotifyApi.getUserPlaylists(constants.USER_ID, {offset}).then(hi => {
					playlists.push(hi.body)
				})

				console.log(playlists)
			}

			playlists = playlists.map((playlist)=>({name: playlist.name, id: playlist.id}))





			res.json(playlists)
  	},function(err) {
	    	console.log('Something went wrong!', err);
  	});
})



router.get('/auth', (req, res) => {
	var authOptions = {
	  url: 'https://accounts.spotify.com/api/token',
	  headers: {
	    'Authorization': 'Basic ' + (Buffer.from(constants.CLIENT_ID + ':' + constants.CLIENT_SECRET).toString('base64'))
	  },
	  form: {
	    grant_type: 'client_credentials'
	  },
	  json: true
	};


	request.post(authOptions, (err, response, body) => {
		if (!err && response.statusCode === 200) {
	      res.send(body.access_token);
	    }
	})

	res.status(200)

	// res.json({test: "hi"})
})

router.get('/all', (req, res) => { 

})

module.exports = router