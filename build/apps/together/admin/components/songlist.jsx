MyComponents.Song = React.createClass({

  // Handler functions get passed to data.jsx which has scope to push to firebase
  handleUpVote: function(event) {
    this.props.actions.upVote(this.props.songKey)
  },
  handleDownVote: function(event) {
    this.props.actions.downVote(this.props.songKey)
  },
  handleDeleteSong: function(event) {
    this.props.actions.deleteSong(this.props.songKey)
  },
  handleAddSong: function(event) {
    this.props.actions.addSong(this.props.songKey)
  },

  render: function() {
   var songName = this.props.song['songName']
   var artist = this.props.song['artist']
   
   if (typeof this.props.song['album'] == "undefined"){
    var album = "None Provided"
   }
   else{
    var album = this.props.song['album']
   }

   // TODO - Iterate through upVote and downVote list and check if the user's name is in one of them
   // If it is, color that list item accordingly
   // Only do it if the user is logged in so make sure to check logged condition.

   if (typeof this.props.song['upVote'] == "undefined") {
    var upVotes = 0
   }
   else{
    var upVotesList = this.props.song['upVote']
    var upVotes = Object.keys(upVotesList).length
   }

   if (typeof this.props.song['downVote'] == "undefined") {
    var downVotes = 0
   }
   else{
    var downVotesList = this.props.song['downVote']
    var downVotes = Object.keys(downVotesList).length
   }

   var voteCount = upVotes - downVotes

   if (this.props.user) {
     return (
     	<li>
        <input type="hidden" value={songName} id="s_name"/>
        <input type="hidden" value={artist} id="s_artist"/>
        <div className="collapsible-header"><a className="btn-small waves-effect waves-light"><i className="small material-icons green-text" onClick={this.handleDeleteSong}>delete</i></a>
			<a className="btn-small waves-effect waves-light"><i className="small material-icons green-text" onClick={this.handleAddSong}>playlist_add</i></a>{ songName }</div>
     	<div className="collapsible-body"><p>Artist: { artist }<br/>Album: { album }<br/>Votes: { voteCount }
			<a className="btn-small waves-effect waves-light">
			<i className="small material-icons teal-text" onClick={this.handleUpVote}>thumb_up</i></a>&nbsp; &nbsp; 
			<a className="btn-small waves-effect waves-light"><i className="small material-icons teal-text" onClick={this.handleDownVote}>thumb_down</i></a></p></div>
      </li>
     );
   }
   else {
    return (
      <li>
        <div className="collapsible-header">{ songName }</div>
        <div className="collapsible-body"><p>Artist: { artist }<br/>Album: { album }<br/>Votes: { voteCount }</p></div>
      </li>
     );
   }
 }
});

class SongList extends React.Component {
  render(){
    var u = this.props.user
    var a = this.props.actions
    var voteList = this.props.songList.map(function(s,i){
      var upVotes = 0
      var downVotes = 0
      if (typeof s[1]['upVote'] != "undefined") {
        var upVotesList = s[1]['upVote']
        var upVotes = Object.keys(upVotesList).length
      }
      if (typeof s[1]['downVote'] != "undefined") {
        var downVotesList = s[1]['downVote']
        var downVotes = Object.keys(downVotesList).length
      }
      return upVotes-downVotes
    })
    console.log(voteList)

    var songList = this.props.songList.map(function(s,i){
      // TODO - Figure out how to order these by upvotes minus downvotes
      // There are two keys since React doesn't actually let you access key
      return <MyComponents.Song song={s[1]} songKey={s[0]} key={i} user={u} actions={a}/>
    })

    // zip the voteList with the songList, then sort by the votes, finally separate the lists
    var combinedList = _.zip(voteList, songList)
    var sortedCombinedList = _.reverse(_.sortBy(combinedList, '0'))
    var uncombinedList = _.unzip(sortedCombinedList)
    var sortedListByVote = uncombinedList[1]

    // Use this list as the time sorted list if tabs are implemented
    var sortedListByTime = _.reverse(songList)

    return (
      <div>
        <div className="card">
          <div className="card-content">
            <ul className="tabs">
              <li className="tab col s6"><a href="#new">New Beats</a></li>
              <li className="tab col s6"><a href="#top">Hot Tracks</a></li>
            </ul>     
            <ul className="collapsible" data-collapsible="expandable" id='new'>
              { sortedListByTime }
            </ul>
            <ul className="collapsible" data-collapsible="expandable" id='top'>
              { sortedListByVote }
            </ul>
          </div>
        </div>      
      </div>
    )
  }
  componentDidMount(){
    $(document).ready(function(){
      $('.collapsible').collapsible({
        accordion : false
      });
    });
  }
  componentDidMount(){
    $(document).ready(function(){
      $('.tabs').tabs();
    });
  }
}
MyComponents.SongList = SongList