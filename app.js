// --------------------------------------------------round 2
require("dotenv").config();
const axios = require("axios");
const express = require("express");
const hbs = require("hbs");
const PORT = 3000;

// require spotify-web-api-node package here:
const SpotifyWebApi = require("spotify-web-api-node");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.log("Something went wrong when retrieving an access token", error)
  );

// Our routes go here:

app.get("/artist-search-results", async (req, res) => {
  spotifyApi
    .searchArtists(artist)
    .then((data) => {
      const apiResponse = data.get(SpotifyWebApi, {
        params: { name: req.query.artist },
      });

      console.log(apiResponse);
      console.log(req.body);
    })
    .catch((err) =>
      console.log("The error while searching artists occurred: ", err)
    );

  // res.render("artist-search-results");
  res.render("artist-search-results", {
    name: apiResponse.data,
    // imgUrl: apiResponse.image,
  });

  // try {
  //   const apiResponse = await axios.get(SpotifyWebApi, {
  //     params: { name: req.query.aritist },
  //   });
  //   console.log(apiResponse.data);
  //   const [foundArtist] = data.body.artist;
  //   //character is the name of the key that we put on the html page
  //   // res.render("character", { character: req.query.character });
  //   res.render("artist-search-results", {
  //     name: foundArtist.name,
  //     // imgUrl: firstCharacterFound.image,
  //   });
  // } catch (err) {
  //   return res.send(`Sorry mate, i cant find that artist in the system 😅`);
  // }
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () =>
  console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊")
);

// --------------------------------------------------round 2
