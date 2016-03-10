// Single 'data' object that holds the data of your entire app, with initial values
var data = {
  songList: [],
  songDiscussion: [],
  currentSong: null,
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
    data.songList = _.values(snapshot.val())
    render()
})

// Make sure this pulls in the order we want and only grabs a subset of the messages
songDiscussionRef.on('value', function(snapshot){
    data.songDiscussion = _.values(snapshot.val())
    render()
})

songListRef.on('value', function(snapshot){
    data.currentSong = snapshot.val()
    render()
})

//
// ACTIONS
//

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
        status: 'online',
      }

      var userRef = ref.child('customers').child(user.username)

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
    var userRef = ref.child('customers').child(data.user.username)

    // unsubscribe to the user data
    userRef.off()

    // set the user's status to offline
    userRef.child('status').set('offline')
    data.user = null
    render()
  }
}