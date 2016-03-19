// Single 'data' object that holds the data of your entire app, with initial values
var data = {
  songList: [],
  songDiscussion: [],
  currentSong: [],
  user: null
}

// a single 'handlers' object that holds all the actions of your entire app
var actions = {}

// Main render() function. 
//     Call whenever the app's UI needs to to re-rendered.
//     'data' and 'actions' are injected into the app.
function render(){
  ReactDOM.render(
    <MyComponents.App
        data={data}
        actions={actions}/>,
    $('#app-container').get(0)
  )
}

//
// DATA
//

var ref = new Firebase('https://rocknroll.firebaseio.com/')
var songListRef = ref.child('songList')
var songDiscussionRef = ref.child('songDiscussion')
var currentSongRef = ref.child('currentSong')

songListRef.on('value', function(snapshot){
    data.songList = _.toPairs(snapshot.val())
    render()
})

// Make sure this pulls in the order we want and only grabs a subset of the messages
songDiscussionRef.on('value', function(snapshot){
    data.songDiscussion = _.values(snapshot.val())
    render()
})

currentSongRef.on('value', function(snapshot){
    data.currentSong = _.values(snapshot.val())
    render()
})

//
// ACTIONS
//

// Submits information from the submit song form
// Currently uses jQuery to grab the elements from the form
// Will not submit if artist or songName is empty, tags submission with user's displayName
actions.submitComment = function(){
  console.log("here")
  var comment = $("#comment").val()
  var displayName = data.user.username
  var image = data.user.imageURL

  var flag = true

  if (comment.length == 0){
    flag = false
  }

  if (flag) {
    songDiscussionRef.push().set({
      comment: comment,
      imageURL: image,
      userName: displayName
    });
    $("#comment").val("");
  }
  
}

actions.submitSong = function(){
  var songName = $("#songName").val()
  var artist = $("#artist").val()
  var album = $("#album").val()
  var displayName = data.user.username

  var flag = true

  if (songName.length == 0){
    flag = false
  }
  if (artist.length == 0){
    flag = false
  }

  if (flag) {
    songListRef.push().set({
      songName: songName,
      artist: artist,
      album: album,
      displayName: displayName
    });
    $("#songName").val("");
    $("#artist").val("");
    $("#album").val("");
  }
  
}

actions.deleteSong = function(songKey){
  var specificSongRef = songListRef.child(songKey)
  specificSongRef.remove()
}

actions.addSong = function(songKey){
  currentSongRef.remove()
  var specificSongRef = songListRef.child(songKey)
  for (var i=0; i<data.songList.length; i++){
    if (data.songList[i][0] == songKey){
      var songName = data.songList[i][1].songName
      var artist = data.songList[i][1].artist
    }
  }
  console.log(songName)
  currentSongRef.push().set({
    songName: songName,
    artist: artist
  });
  specificSongRef.remove()
}

actions.upVote = function(songKey){
  var specificSongRef = songListRef.child(songKey)
  var userName = data.user.username
  var upVoteRef = specificSongRef.child("upVote").child(userName)
  var downVoteRef = specificSongRef.child("downVote").child(userName)
  downVoteRef.remove()
  upVoteRef.set({
    userName: userName
  })
}

actions.downVote = function(songKey){
  var specificSongRef = songListRef.child(songKey)
  var userName = data.user.username
  var upVoteRef = specificSongRef.child("upVote").child(userName)
  var downVoteRef = specificSongRef.child("downVote").child(userName)
  upVoteRef.remove()
  downVoteRef.set({
    userName: userName
  })
}

actions.login = function(){
  ref.authWithOAuthPopup("github", function(error, authData){

    // handle the result of the authentication
    if (error) {
      console.log("Login Failed!", error);
      actions.logged = false
      actions.loggedFB = false
    } else {
      actions.logged = true
      actions.loggedFB = false
      console.log("Authenticated successfully with payload:", authData);

      // create a user object based on authData
      var user = {
        displayName: authData.github.displayName,
        username: authData.github.username,
        id: authData.github.id,
        imageURL: authData.github.profileImageURL,
        status: 'online'
      }

      var userRef = ref.child('admins').child(user.username)

      // subscribe to the user data
      userRef.on('value', function(snapshot){
        data.user = snapshot.val()
        render()
      })
      // set the user data
      userRef.set(user)
    }
  })
}

actions.logout = function(){
  if (data.user){
    actions.logged = false
    ref.unauth()
    var userRef = ref.child('admins').child(data.user.username)

    // unsubscribe to the user data
    userRef.off()

    // set the user's status to offline
    userRef.child('status').set('offline')
    data.user = null
    render()
  }
}