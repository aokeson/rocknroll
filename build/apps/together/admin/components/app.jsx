class App extends React.Component {
  render(){
    var log;
    var signout;
    if(this.props.actions.login) {
      log = this.props.actions.login
      signout = this.props.actions.logout
    }
    return (
      <div>
        <MyComponents.NavBar actions={this.props.actions}/>
        <MyComponents.User
          user={this.props.data.user}
          actions={this.props.actions}
          loginAction={log}
          logoutAction={signout}/>
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <MyComponents.SongForm
                actions={this.props.actions}
                user={this.props.data.user}/>
              <MyComponents.SongList
                actions={this.props.actions}
                user={this.props.data.user}
                songList={this.props.data.songList}/>
            </div>
            <div className="col s12 m6">
              <MyComponents.CurrentSong
                user={this.props.data.user}
                currentSong={this.props.data.currentSong}/>
              <MyComponents.Comments
                actions={this.props.actions}
                user={this.props.data.user}
                Comments={this.props.data.songDiscussion}/>
            </div>
          </div>  
        </div>
      </div>
    );
  }
  
  
}

MyComponents.App = App