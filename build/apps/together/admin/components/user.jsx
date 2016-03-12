class User extends React.Component {
  	render(){
	    if (this.props.user){
	      	// user is authenticated
	      	return(<div></div>);
	    } 
	    else {
	      // user is not set
	      	return(
	      		<div className="container center">
	      			<h4>You are not logged in yet.</h4>
	      			<div className="row">
	            		<a className="waves-effect waves-light btn-large grey darken-3" onClick={this.props.actions.login}>LOGIN VIA GITHUB</a>
	        		</div>
	    		</div>
			);
	    }
  	}
}
MyComponents.User = User