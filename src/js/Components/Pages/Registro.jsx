
import React from 'react';
import {auth} from './../../helpers.jsx';
class Registro extends React.Component {
    
    constructor () {
        super();
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
           auth(this.state.email,this.state.password).then((user) => {
        console.log("Usuario Creado");
        
          
      })

    }
    

	render() {
		return (<section>
		<h2>REGISTRO</h2>
		
		        		<form onSubmit={this.handleSubmit}>
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
                    <button>Registrar</button>
              </form>
		
		
		</section>);
	}
}

export default Registro;

