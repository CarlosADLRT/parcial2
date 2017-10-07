
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import Header from './Layout/Header.jsx';
import Footer from './Layout/Footer.jsx';

import Public from './Pages/Public.jsx';
import Login from './Pages/Login.jsx';

import Dashboard from './Pages/Dashboard.jsx';
import NewPost from './Pages/NewPost.jsx';
import Profile from './Pages/Profile.jsx';
import PostDetail from './Pages/PostDetail.jsx';



import * as firebase from 'firebase';






class Main extends React.Component {
	constructor(props){
	super(props);
        this.state = {  isAuthenticated: false  }
        this.auth = this.auth.bind(this)
	}
	componentDidMount(){
		            firebase.auth().onAuthStateChanged((user)=> {
		  if (user) {
		    // User is signed in.
            this.setState({isAuthenticated:true})
            
		  } else {
		    // No user is signed in.
            this.setState({isAuthenticated:false})
		  }
        
    })
	}
	
	auth(){
		console.log('hola');
	}
	
	render() {
		
		if(!this.state.isAuthenticated){
			<Redirect to='/'/>
		}
		
		return (<main>
		 <Router >
		 		    <div>
		 		    <Header/>
		     <Route exact path="/" component={Dashboard}/>
		      <Route path="/new" component={NewPost} />
		     	<Route path="/login" component={Login} />
					<Route path="/profile" component={Profile} />
					<Route path="/post/:id" component={PostDetail} />



		    </div>
		  </Router>
		
		<Footer />
		</main>);
	}
}

export default Main;
