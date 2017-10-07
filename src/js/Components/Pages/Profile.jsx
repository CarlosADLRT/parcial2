
import React from 'react';
import * as firebase from 'firebase';


class Profile extends React.Component {
    
    constructor(props){
        super(props)
        this.state={user:{}}
        this.uploadImage = this.uploadImage.bind(this);
        this.getFileName = this.getFileName.bind(this);
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
            var user = firebase.auth().currentUser;
            
            user.updateProfile({
              photoURL: downloadURL
            }).then(function() {
              // Update successful.
              
            }, function(error) {
              // An error happened.
            });
        });
        
        
    }
        
    getFileName(){
        var name = document.getElementById('imageselector');
        this.state.file = name.files.item(0);
        console.log(this.state.file.name)
    }
    
    componentDidMount(){
        var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid, emailVerified;
        
        if (user != null) {
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          emailVerified = user.emailVerified;
          uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                           // this value to authenticate with your backend server, if
                           // you have one. Use User.getToken() instead.
            this.setState({user:{name,email,photoUrl,uid}})
            console.log(this.state.photoUrl);
        }else{
            this.props.history.push('/')
        }
        
    }
	render() {
		return (<section>
		<h2>Profile</h2>
		<img src={this.state.user.photoUrl}/>
		  <div>
    	       <input type='file' id="imageselector" accept="image/*" onChange={this.getFileName}/>
    	       <button type="button" onClick={this.uploadImage}>Upload</button>
          </div>
		</section>);
	}
}

export default Profile;

