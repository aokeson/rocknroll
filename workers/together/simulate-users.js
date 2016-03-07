var _ = require('lodash')
var random_name = require('node-random-name');
var Firebase = require('firebase');

var ref = new Firebase('https://rocknroll.firebaseio.com/');
var usersRef = ref.child("customers");
var adminRef = ref.child("admins");

// Global duration between actions that participants make
var seconds = 10.

// simualate a random person entering, staying for a duration, and leaving
function simulate(){

  // generate a random person with a random name,
  // random location, and random duration
  var name = random_name();
  var duration = 100 + 20 * Math.random();

  var person = {
    name: name,
    duration: duration,
  }

  // simulate this person entering
  enter(person)

}

// Simulate the admin entering
// Admin adds the first song
// Admin will remove a song every 30 seconds and occasionally change the currently playing song
function adminActions() {
  var name = random_name();
  var personRef = adminRef.child(name);
  var songRef = ref.child("songList")
  var currentRef = ref.child("currentSong")

  var firstSongArtist = random_name();
  var firstSongName = firstSongArtist + "'s Song"
  
  personRef.set({
    name: name
  });

  currentRef.push().set({
    songName: firstSongName,
    artist: firstSongArtist
  });

  setInterval(function() {
    songRef.once("value", function(songList) {
      var numSongs = songList.numChildren()
      var counter = 0
      var randomSong = Math.floor(Math.random() * numSongs)
      var randomSel = Math.random()
      songList.forEach(function(song){
        if (counter == randomSong) {
          // Remove the song from the songlist
          var specificSong = songRef.child(song.key())
          specificSong.remove()

          // Possible chance of adding the song to currently played
          if (randomSel <= 0.35) {
            currentRef.remove()
            currentRef.push().set({
              songName: song.val().songName,
              artist: song.val().artist
            });
          }
        }
        counter = counter + 1
      })
    })
  }, 30000)
}

// A customer enters the application
// Currently, the only information sent to firebase is the customer's name
function enter(person){
  console.log('enter', person)
  var personRef = usersRef.child(person.name);

  personRef.set({
    name: person.name
  });

  // Have the customer act for the duration he/she is around
  moveForDuration(person)

}

// Each person acts once every duration interval
// Once the person has less than the final duration interval, he/she waits that time period and then exits
function moveForDuration(person){
  var milliseconds = seconds * 1000

  if (person.duration > seconds){
    setTimeout(function(){
      move(person)
    }, milliseconds)
  }
  else {
    setTimeout(function(){
      leave(person)
    }, person.duration * 1000)
  }
}

// The person is capable of one of four actions during a movement
//  1. Add a comment
//  2. Add a song
//  3. Cast a vote for a song
//  4. Do nothing
function move(person){
  var personRef = usersRef.child(person.name);

  var randVal = Math.random()

  if (randVal <= 0.25) {
    addComment(person.name)
  }
  else if (randVal <= 0.5){
    addSong()
  }
  else if (randVal <= 0.75){
    vote(person.name)
  }
  
  person.duration = person.duration - seconds

  console.log('move', person)
  moveForDuration(person)
}

// Removes the person from the firebase
function leave(person){
  console.log('leave', person)
  var personRef = usersRef.child(person.name);

  personRef.remove();
}

// Add a song under "songList" in the firebase
function addSong(){
  var songRef = ref.child("songList")

  var artist = random_name()
  var songName = artist + "'s Song";

  // Song is set with a unique id - will likely match implementation
  songRef.push().set({
    songName: songName,
    artist: artist
  });
}

// Add a comment under "songDiscussion" in the firebase
// Comments are tagged with the user's name
function addComment(userName){
  var commentRef = ref.child("songDiscussion")

  var userName = random_name()
  var comment = userName + "'s Comment";
  // we can also chain the two calls together
  commentRef.push().set({
    userName: userName,
    comment: comment
  });
}

// Users vote by adding their name either to the "upVote" or "downVote" field of a song
function vote(userName){
  var songRef = ref.child("songList")

  var rand = Math.random()
  if (rand < 0.49) {
    var voteType = false
  }
  else {
    var voteType = true
  }

  songRef.once("value", function(songList) {
    var numSongs = songList.numChildren()
    var counter = 0
    var randomSong = Math.floor(Math.random() * numSongs)

    songList.forEach(function(song){
      if (counter == randomSong) {
        var specificSongRef = songRef.child(song.key())
        var upVoteRef = specificSongRef.child("upVote").child(userName)
        var downVoteRef = specificSongRef.child("downVote").child(userName)
        console.log(song.key())

        // Vote accordingly - automatically remove user's name from other list if it exists
        if (voteType) {
          downVoteRef.remove()
          upVoteRef.set({
            userName: userName
          })
        }
        else {
          upVoteRef.remove()
          downVoteRef.set({
            userName: userName
          })
        }
      }

      counter = counter + 1
    })
  });
}

function clear(){
  ref.remove()
}

clear()

// Admin enters at start and will occasionally remove a song or change the currently playing song
adminActions()

// Run every ten seconds
setInterval(simulate, 5000)
