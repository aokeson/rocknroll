MyComponents.Song = React.createClass({
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

   return (
   	<li>
   		<div className="collapsible-header">{ songName }</div>
   		<div className="collapsible-body"><p>Artist: { artist }<br/>Album: { album }<br/>Votes: { voteCount }</p></div>
    </li>
   );
 }
});

class SongList extends React.Component {
  render(){
  	var songList = this.props.songList.map(function(s,i){
      // TODO - Figure out how to order these by upvotes minus downvotes
      return <MyComponents.Song song={s} key={i}/>
    })

    return (
      <div>
        <div className="card">
          <div className="card-content">
            <ul className="collapsible" data-collapsible="expandable">
              { songList }
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
}
MyComponents.SongList = SongList