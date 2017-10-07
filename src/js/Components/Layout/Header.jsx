
import React from 'react';
import Nav from './Nav.jsx';
import * as firebase from 'firebase'
import {
  Route,
  Link,
} from 'react-router-dom';

class Header extends React.Component {
	constructor(props){
		super(props);
		this.state = {items:[{label:'Login',path:'/login'},{label:'Sign Up',path:'/register'}],authenticate:false}
		this.logout = this.logout.bind(this);
	}
	
	componentDidMount(){
		const self = this;
		firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
		    // User is signed in.
			self.setState({authenticate:true})
		
		  } else {
		    // No user is signed in.
			self.setState({authenticate:false})
		  }
		});

	}
	logout(){
		
		firebase.auth().signOut().then(()=> {
  // Sign-out successful.
  			this.setState({authenticate:false})

}).catch(function(error) {
  // An error happened.
});
	}
	
	
	render() {
		if(!this.state.authenticate){
					return (<header>
	<nav className="navbar navbar-expand navbar-dark navbar-main">
	    <ul className="navbar-nav mt-2 mt-lg-0">
	    	<li className="nav-item active">
		        <a className="nav-link"><Link to='/'>Dashboard</Link></a>
		     </li>
			<li className="nav-item active">
		        <a className="nav-link"><Link to='/login'>Login</Link></a>
		     </li>
		     	<li className="nav-item active">
		        <a className="nav-link"><Link to='/signup'>Sign Up</Link></a>
		     </li>
		</ul>
	</nav>

		
		</header>);
		}
							return (<header>
	<nav className="navbar navbar-expand navbar-dark navbar-main">
	    <ul className="navbar-nav mt-2 mt-lg-0">
	      	<li className="nav-item active">
		        <a className="nav-link"><Link to='/'>Dashboard</Link></a>
		     </li>
			<li className="nav-item active">
		        <a className="nav-link"><Link to='/new'>New Post</Link></a>
		     </li>
		     	<li className="nav-item active">
		        <a className="nav-link"><Link to='/profile'>Profile</Link></a>
		     </li>
		      	<li className="nav-item active">
		        <a className="nav-link" onClick={()=>{this.logout()}}><Link to='/'>Logout</Link></a>
		     </li>
		</ul>
	</nav>

		
		</header>);

	}
}

export default Header;
