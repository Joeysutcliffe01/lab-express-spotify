require("dotenv").config();

const express = require("express");
const hbs = require("hbs");

const app = express();
const PORT = 3000;

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

const SpotifyWebApi = require("spotify-web-api-node");

// require spotify-web-api-node package here:
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// console.log(spotifyApi);

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.log("Something went wrong when retrieving an access token", error)
  );

// Our routes go here:

app.get("/artist-search", (req, res) => {
  //   const { artist } = req.data.artist;

  spotifyApi
    .searchArtists(req.query.artistName)
    .then((data) => {
      console.log("The received data from the API: ", data.body);
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'

      return res.render("artist-search-results", {
        artist: data.body.artist.items,
      });

      console.log(artist);
    })
    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () =>
  console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊")
);
