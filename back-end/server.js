const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/fantasyDreamTeam', {
  useNewUrlParser: true
});

// Configure multer so that it will upload to '../front-end/public/images/userAdded'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/userAdded',
  limits: {
    fileSize: 10000000
  }
});

// Create a scheme for the teams
const teamSchema = new mongoose.Schema({
    teamName: String,
    photoPath: String,
    characters: Array,
  });

// Create a model for the teams 
const Team = mongoose.model('Team', teamSchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    photoPath: "/images/userAdded/" + req.file.filename
  });
});

// Create a new team in the database
app.post('/api/teams', async (req, res) => {

    const team = new Team({
      teamName: req.body.teamName,
      photoPath: req.body.photoPath,
      characters: req.body.characters,
    });
    try {
      await team.save();
      res.send(team);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

// Get a list of all of the teams in the database
app.get('/api/teams', async (req, res) => {
    try {
      let teams = await Team.find();
      res.send(teams);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });


// Delete a team from the database
  app.delete('/api/teams/:id', async (req, res) => {
try {
    await Team.deleteOne({
    _id: req.params.id
    });
    res.sendStatus(200);
} catch (error) {
    console.log(error);
    res.sendStatus(500);
}
});

//Edit a team in the database
app.put('/api/teams/:id', async (req, res) => {
try {
    let team = await Team.findOne({
    _id: req.params.id
    });
    team.teamName = req.body.teamName;
    team.photoPath = req.body.photoPath;
    team.characters = req.body.characters;
    team.save();
    res.sendStatus(200);
} catch (error) {
    console.log(error);
    res.sendStatus(500);
}
}); 


app.listen(31415, () => console.log('Server listening on port 31415!'));
