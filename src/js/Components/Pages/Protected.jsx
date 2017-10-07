
import React from 'react';
import * as  firebase from 'firebase'
import Registro from './Registro.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';
import {logout, ref} from './../../helpers.jsx';
import Login from './Login.jsx';

class Protected extends React.Component {
	
    constructor () {
        super(); 
				this.state = {  
					isAuthenticated:false,
					messages:[]
    		    } 	    
    		    this.authenticate = this.authenticate.bind(this);
    		    this.getFileName = this.getFileName.bind(this);
    		    this.uploadImage = this.uploadImage.bind(this);
    }
    logout() {
    	logout()
    	.then(()=>{
    		this.setState({isAuthenticated: false});
    	})
     	
    }
  
    componentDidMount(){
        firebase.database().ref().child('images').on('value',(snapshot) =>{
            
            let messages = snapshot.val();
            let newState = [];
            for (let message in messages){
                 newState.push({
                     id: message,
                     name: messages[message].name,
                     link: messages[message].link,
                 });
            }
            
            this.setState({
               messages: newState 
            });
        });
    }
    authenticate() {
           this.setState({isAuthenticated: true});
    }
    
    getFileName(){
        var name = document.getElementById('imageselector');
        this.state.file = name.files.item(0);
        console.log(this.state.file.name)
    }
    
    uploadImage(){
        console.log("subir");
        var fileName = this.state.file.name;
        var storageRef = firebase.storage().ref('/images/'+fileName);
        var uploadTask = storageRef.put(this.state.file);
        
        uploadTask.on('state_changed', function(snapshot){
            
            
        }, function(error){
            console.log(error)
        } , function(){
            var downloadURL = uploadTask.snapshot.downloadURL;
            console.log(downloadURL);
            const imageRef = firebase.database().ref().child('images');
            const newImage = {
                link: downloadURL,
                name: fileName
            }
          imageRef.push(newImage);
          this.state.file="";
        });
        
        
    }
    
    
	render() {
		return (<section>
		<h2>Protected Page</h2>
		
		{
          this.state.isAuthenticated===true ? 
          <div>
    	      <Registro/>
    	      {this.state.messages.map(item=>{
    	        return  <img key={item.id} src={item.link}/>
    	      })
    	      }
    	       <input type='file' id="imageselector" accept="image/*" onChange={this.getFileName}/>
    	       <button type="button" onClick={this.uploadImage}>Upload</button>
    	      <button onClick={()=>this.logout()}>Logout</button>
          </div>
        : 
         <Login isAuthenticated={this.authenticate} /> 
		}
			
		</section>);
	}
}

export default Protected;

