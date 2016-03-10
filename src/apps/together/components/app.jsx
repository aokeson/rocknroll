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
                user={this.props.data.user}/>
              <MyComponents.SongList
                user={this.props.data.user}
                songList={this.props.data.songList}/>
            </div>
          </div>  
        </div>
      </div>
    );
  }
}

MyComponents.App = App