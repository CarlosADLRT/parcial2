
import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

import {login} from './../../helpers.jsx';


class Login extends React.Component {
	
	 
    constructor (props) {
        super(props);
        this.state = {  email: '',
                        password: '',
                        message:''
                     }
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
    
    handleSubmit(e) {
      e.preventDefault();
              

      login(this.state.email,this.state.password)
      .then((user) => {
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        this.props.history.push('/')
      })
      .catch((error) => {
        this.setState({message: error.message});
      })
    }
      
	render() {
	  
	  
		return (<article>
        
		   <div className="row justify-content-center align-items-center">

		    <div className="col-6">
		    <div className="card-bootcamp">
		    <div className="card-body d-flex flex-column align-items-center justify-content-center">
		    		   		   <h2>Login</h2>

		     		<form className="d-flex flex-column align-items-center justify-content-center"  onSubmit={this.handleSubmit}>
                    Email   
                    <input 
                      value={this.state.email}    
                      onChange={this.handleChange} 
                      name="email"    
                      type="email" 
                      placeholder="email@domain.com"/>
                      <br />
                    Password    
                    <input 
                      value={this.state.password}     
                      onChange={this.handleChange} 
                      name="password"    
                      type="password" 
                      placeholder="password" />
                      <br />
                    <button className="btn btn-primary">Login</button>
              </form>
              </div>
		   </div>
       
        </div>
        </div>
		  
		</article>);
	}
}

export default Login;

